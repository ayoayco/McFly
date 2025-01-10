import { eventHandler } from 'h3'
import { useRuntimeConfig, useStorage } from 'nitropack/runtime'
import { createHooks } from 'hookable'
import { consola } from 'consola'
import { colorize } from 'consola/utils'

import {
  hooks as mcflyHooks,
  defaultMcflyConfig,
  evaluateServerScripts,
  injectHtmlFragments,
  injectCustomElements,
} from '@mcflyjs/core/runtime/index.js' // important to import from installed node_module because this script is passed to another context

/**
 * @typedef {import('../config').McFlyConfig} Config
 * @typedef {import('unstorage').Storage} Storage
 * @typedef {import('unstorage').StorageValue} StorageValue
 * @typedef {import('h3').EventHandler} EventHandler
 */

/**
 * McFly middleware event handler
 */
export default eventHandler(async (event) => {
  const timeStart = performance.now()
  const hooks = createHooks()
  Object.keys(mcflyHooks).forEach((hookName) => hooks.addHooks(hookName))
  const { path } = event
  let { mcfly: config } = useRuntimeConfig()
  const storage = useStorage()

  // if not page, don't render
  if (event.path.startsWith('/api')) {
    return
  }

  if (!config || Object.keys(config).length === 0) {
    config = defaultMcflyConfig
    consola.warn(
      `[WARN]: McFly configuration not found, using defaults...`,
      defaultMcflyConfig
    )
  }

  const plugins = config.plugins ?? []

  plugins.forEach((plugin) => {
    const pluginHooks = Object.keys(plugin)
    pluginHooks.forEach((pluginHook) => {
      hooks.hook(pluginHook, plugin[pluginHook])
    })
  })

  const { components: componentType } = config
  let html = await getHtml(path, storage)

  if (html) {
    const transforms = [
      {
        fn: evaluateServerScripts,
        args: [''],
        hook: mcflyHooks.serverScriptsEvaluated,
      },
      {
        fn: injectHtmlFragments,
        args: [storage],
        hook: mcflyHooks.fragmentsInjected,
      },
      {
        fn: injectCustomElements,
        args: [componentType, storage],
        hook: mcflyHooks.customElementsInjected,
      },
    ]

    if (!!componentType && !!html) {
      for (const transform of transforms) {
        html = await transform.fn(html.toString(), ...transform.args)

        // call hook
        if (transform.hook) {
          hooks.callHook(transform.hook)
        }
      }
    } else {
      consola.error('[ERR]: Failed to insert registry', {
        componentType: !componentType ? 'missing' : 'okay',
        html: !html ? 'missing' : 'okay',
      })
    }
  }

  if (html) {
    hooks.callHook(mcflyHooks.pageRendered)
  }

  const timeEnd = performance.now()
  consola.log(
    colorize('green', event.path),
    'rendered in',
    Math.round(timeEnd - timeStart),
    'ms'
  )
  return (
    html ??
    new Response(
      '😱 ERROR 404: Not found. You can put a 404.html on the ./src/pages directory to customize this error page.',
      { status: 404 }
    )
  )
})
/**
 * Gets the storage path for a file
 * @param {string} filename
 * @returns {string}
 */
function getPath(filename) {
  return `assets:pages${filename}`
}

function getPurePath(path) {
  return path.split('?')[0]
}
/**
 * Gets the correct HTML depending on the path requested
 * @param {string} path
 * @param {Storage} storage
 * @returns {Promise<StorageValue>}
 */
async function getHtml(path, storage) {
  const purePath = getPurePath(path)
  const rawPath =
    purePath[purePath.length - 1] === '/' ? purePath.slice(0, -1) : purePath
  const filename = rawPath === '' ? '/index.html' : `${rawPath}.html`
  const fallback = getPath(rawPath + '/index.html')
  const filePath = getPath(filename)
  let html = await storage.getItem(filePath)
  if (!html) html = await storage.getItem(fallback)
  if (!html) html = await storage.getItem(getPath('/404.html'))

  return html
}
