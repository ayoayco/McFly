import { consola } from 'consola'
import { eventHandler } from 'h3'
import { createHooks } from 'hookable'
import { hooks as mcflyHooks } from './hooks.mjs'
import { evaluateServerScripts } from './evaluate-scripts.mjs'
import { injectHtmlFragments } from './inject-fragments.mjs'
import { injectCustomElements } from './inject-elements.mjs'
import defaultMcflyConfig from './default-mcfly-config.mjs'
import { loadConfig } from 'c12'

/**
 * @typedef {import('../config').McFlyConfig} Config
 * @typedef {import('unstorage').Storage} Storage
 * @typedef {import('unstorage').StorageValue} StorageValue
 * @typedef {import('h3').EventHandler} EventHandler
 */

/**
 * Intercepts all routes and assembles the correct HTML to return
 * @deprecated
 * @param {{
 *  storage: Storage
 * }} param0
 * @returns {EventHandler}
 */
export function useMcFlyRoute({ storage }) {
  return eventHandler(async (event) => {
    const hooks = createHooks()
    Object.keys(mcflyHooks).forEach((hookName) => hooks.addHooks(hookName))
    const { path } = event
    let { config } = await loadConfig({ name: 'mcfly' })

    if (!config || Object.keys(config).length === 0) {
      config = defaultMcflyConfig
      consola.warn(`[WARN]: McFly configuration not loaded, using defaults...`)
    }

    const plugins = config.plugins

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

    return (
      html ??
      new Response(
        '😱 ERROR 404: Not found. You can put a 404.html on the ./src/pages directory to customize this error page.',
        { status: 404 }
      )
    )
  })
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

/**
 * Gets the storage path for a file
 * @param {string} filename
 * @returns {string}
 */
function getPath(filename) {
  return `assets:pages${filename}`
}
