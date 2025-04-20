import { ELEMENT_NODE, parse, render, walkSync } from 'ultrahtml'
import { getFiles } from './get-files.js'
// import type { Storage } from 'unstorage'
// import type { McFlyConfig } from '../../../config/dist/index.js'

/**
 * @typedef {import('../../../config/dist/index.js').McFlyConfig} McFlyConfig
 */

/**
 * Returns transformed HTML with custom elements registry in the head
 * @param {string} html
 * @param {McFlyConfig['components']} type
 * @param {Storage} storage
 * @returns {Promise<string>}
 */
export async function injectCustomElements(html, type, storage) {
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
