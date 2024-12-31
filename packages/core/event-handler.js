import { ELEMENT_NODE, parse, render, renderSync, walkSync } from 'ultrahtml'
import { parseScript } from 'esprima'
import { loadConfig } from 'c12'
import { eventHandler } from 'h3'

/**
 * @typedef {import('../config').McFlyConfig} Config
 * @typedef {import('unstorage').Storage} Storage
 * @typedef {import('unstorage').StorageValue} StorageValue
 * @typedef {import('ultrahtml').Node} HtmlNode
 * @typedef {import('estree').BaseNode} JsNode
 * @typedef {import('h3').EventHandler} EventHandler
 */

/**
 * Intercepts all routes and assembles the correct HTML to return
 * @param {{
 *  storage: Storage
 * }} param0
 * @returns {EventHandler}
 */
export function useMcFlyRoute({ storage }) {
  return eventHandler(async (event) => {
    const { path } = event
    const { config } = await loadConfig({ name: 'mcfly' })
    const { components: componentType } = config
    let html = await getHtml(path, storage)

    if (html) {
      const transforms = [evaluateServerScript, deleteServerScripts]

      for (const transform of transforms) {
        html = transform(html.toString())
      }

      html = await useFragments(html.toString(), storage)

      if (!!componentType && !!html) {
        html = await insertRegistry(html.toString(), componentType, storage)
      } else {
        console.error('[ERR]: Failed to insert registry', {
          componentType: !componentType ? 'missing' : 'okay',
          html: !html ? 'missing' : 'okay',
        })
      }
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

/**
 * Returns transformed HTML with custom elements registry in the head
 * @param {string} html
 * @param {Config['components']} type
 * @param {Storage} storage
 * @returns {Promise<string>}
 */
async function insertRegistry(html, type, storage) {
  const ast = parse(html)
  const componentFiles = await getFiles(type, storage)
  const availableComponents = componentFiles.map((key) =>
    key.replace(`.${type}`, '')
  )

  const usedCustomElements = []

  walkSync(ast, (node) => {
    const usedElement = availableComponents.find((name) => name === node.name)

    if (node.type === ELEMENT_NODE && !!usedElement) {
      usedCustomElements.push(usedElement)
    }
  })

  // insert registry script to head
  if (usedCustomElements.length > 0) {
    const registryScript = await buildRegistry(
      usedCustomElements,
      type,
      storage
    )
    walkSync(ast, (node) => {
      if (node.type === ELEMENT_NODE && node.name === 'head') {
        node.children.push(parse(registryScript))
      }
    })
  }

  return render(ast)
}

/**
 * Builds the string containing all custom elements definition
 * @param {Array<string>} usedCustomElements
 * @param {Config['components']} type
 * @param {Storage} storage
 * @returns {Promise<string>}
 */
async function buildRegistry(usedCustomElements, type, storage) {
  let registryScript = `<script type='module'>`
  let isBaseClassImported = false
  let classesImported = []

  for (const name of usedCustomElements) {
    const content = await storage.getItem(`assets:components:${name}.${type}`)
    if (!content) continue
    const evalStore = eval(
      `class WebComponent {}; class HTMLElement {}; (${content.toString()})`
    )

    if (isConstructor(evalStore)) {
      const className = new evalStore().constructor.name

      if (!classesImported.includes(className)) {
        if (
          !isBaseClassImported &&
          content.toString().includes('extends WebComponent')
        ) {
          const baseClassImport = `import { WebComponent, html, attachEffect } from "https://unpkg.com/web-component-base@2.0.6/index.js";`
          registryScript += baseClassImport
          isBaseClassImported = true
        }

        registryScript += content

        registryScript += `customElements.define("${name}", ${className});`
        classesImported.push(className)
      }
    }
  }

  registryScript += '</script>'

  return registryScript
}

/**
 * Check if function is a constructor
 * @param {function} f
 * @returns boolean
 */
function isConstructor(f) {
  try {
    new f()
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    // TODO: verify err is the expected error and then
    return false
  }
  return true
}

/**
 * Evaluates server:setup script and replaces all variables used in the HTML
 * @param {string} html
 * @returns {string}
 */
function evaluateServerScript(html) {
  const ast = parse(html)
  const serverScripts = []
  walkSync(ast, (node) => {
    const { attributes } = node
    const attributeKeys = Object.keys(attributes ?? {})
    const isServerScript = attributeKeys.some((key) => key.includes('server:'))
    if (
      node.type === ELEMENT_NODE &&
      node.name === 'script' &&
      isServerScript
    ) {
      const scripts = node.children.map((child) => child.value)
      const script = cleanScript(scripts)
      serverScripts.push(script)
    }
  })

  const setupMap = {}
  serverScripts.forEach((script) => {
    const { body } = parseScript(script)
    const keys = body
      .filter((n) => n.type === 'VariableDeclaration')
      .map((n) => n['declarations'][0].id.name)
    const constructor = `(function(){}.constructor)(\`${script}; return {${keys.join(
      ','
    )}}\`);`
    const evalStore = eval(constructor)
    Object.assign(setupMap, new evalStore())
  })

  const regex = /\{\{(.*?)\}\}/g
  let match

  while ((match = regex.exec(html))) {
    let [key, rawValue] = match

    const value = rawValue.replace(/\s/g, '')
    const keys = value.split('.')
    let finalValue = ''
    let setupCopy = setupMap

    // if not in the server script, it could be a js expression
    if (!(keys[0] in setupMap)) {
      try {
        finalValue = eval(rawValue)
      } catch (e) {
        console.error('ERR! Failed to evaluate expression', e)
      }
    }

    // nested objects
    keys.forEach((key) => {
      if (key in setupCopy) {
        finalValue = setupCopy[key]
        setupCopy = finalValue
      }
    })

    html = html.replace(key, finalValue ?? '')
    regex.lastIndex = -1
  }

  return html
}

/**
 * Removes any instance of server:setup script in the HTML
 * @param {string} html
 * @returns {string}
 */
function deleteServerScripts(html) {
  const ast = parse(html)
  walkSync(ast, (node) => {
    const { attributes } = node
    const attributeKeys = Object.keys(attributes ?? {})
    const isServerScript = attributeKeys.some((key) => key.includes('server:'))
    if (isServerScript && !!node.parent) {
      node.parent.children.splice(node.parent.children.indexOf(node), 1)
    }
  })

  return renderSync(ast)
}

/**
 * Cleans a JS string for save evaluation
 * @param {Array<string>} scripts
 * @returns {string}
 */
function cleanScript(scripts) {
  let script = scripts.map((s) => s.trim()).join(' ')

  script = removeComments(script)

  return script //.replace(/\n/g, '').replace(/\s+/g, ' ')
}

/**
 * Checks if given node of a JS script is a comment
 * @param {JsNode} node
 * @returns {boolean}
 */
function isComment(node) {
  return (
    node.type === 'Line' ||
    node.type === 'Block' ||
    node.type === 'BlockComment' ||
    node.type === 'LineComment'
  )
}

/**
 * Removes all instances of comments in a JS string
 * @param {string} script
 * @returns {string}
 */
function removeComments(script) {
  const entries = []
  parseScript(script, { comment: true }, function (node, meta) {
    if (isComment(node)) {
      entries.push({
        start: meta.start.offset,
        end: meta.end.offset,
      })
    }
  })

  entries
    .sort((a, b) => {
      return b.end - a.end
    })
    .forEach((n) => {
      script = script.slice(0, n.start) + script.slice(n.end)
    })

  return script
}

/**
 * Return HTML with all fragments replaced with the correct content in the storage
 * @param {string} html
 * @param {Storage} storage
 * @returns {Promise<string>}
 */
async function useFragments(html, storage) {
  const fragmentFiles = await getFiles('html', storage)

  const availableFragments = fragmentFiles.reduce((acc, key) => {
    return {
      ...acc,
      [key.replace('.html', '')]: '',
    }
  }, {})
  const ast = parse(html)

  for (const key in availableFragments) {
    /**
     * @type string | null
     */
    let text = await storage.getItem('assets:components:' + key + '.html')
    if (!text) continue
    availableFragments[key] = text.replace(/\n/g, '').replace(/\s+/g, ' ')
  }

  walkSync(ast, (node) => {
    const selector = Object.keys(availableFragments).find(
      (name) => name === node.name
    )

    if (node.type === ELEMENT_NODE && !!selector) {
      const index = node.parent.children.indexOf(node)
      /**
       * @type {HtmlNode}
       */
      const fragmentNode = parse(availableFragments[selector])

      replaceSlots(fragmentNode, node)

      node.parent.children[index] = fragmentNode
    }
  })

  return render(ast)
}

/**
 * Replace a slot in a fragmentNode with given node
 * @param {HtmlNode} fragmentNode
 * @param {HtmlNode} node
 * @returns {void}
 */
function replaceSlots(fragmentNode, node) {
  let slotted = []
  const containsAll = (arr, target) => target.every((v) => arr.includes(v))
  walkSync(fragmentNode, (n) => {
    if (n.type === ELEMENT_NODE && n.name === 'slot') {
      // find node child with same name attribute
      const currentSlotName = n.attributes?.['name'] ?? null
      let nodeChildren = []

      if (currentSlotName === null) {
        nodeChildren = node.children.filter(
          (child) => !child.attributes?.['slot']
        )
      } else {
        nodeChildren = node.children.filter((child) => {
          const childSlotName = child.attributes?.['slot']
          return childSlotName === currentSlotName
        })
      }

      if (nodeChildren.length > 0 && !containsAll(slotted, nodeChildren)) {
        slotted = [...slotted, ...nodeChildren]
        const index = n.parent.children.indexOf(n)
        n.parent.children.splice(index, 1, ...nodeChildren)
      }
    }
  })
}

/**
 * Get all files from the storage given a type
 * @param {string} type
 * @param {Storage} storage
 * @returns {Promise<string[]>}
 */
async function getFiles(type, storage) {
  return (await storage.getKeys('assets:components'))
    .map((key) => key.replace('assets:components:', ''))
    .filter((key) => key.includes(type))
}
