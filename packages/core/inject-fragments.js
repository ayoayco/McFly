import { ELEMENT_NODE, parse, render, walkSync } from 'ultrahtml'
import { getFiles } from './get-files.js'

/**
 * @typedef {import('ultrahtml').Node} HtmlNode
 */

/**
 * Return HTML with all fragments replaced with the correct content in the storage
 * @param {string} html
 * @param {Storage} storage
 * @returns {Promise<string>}
 */
export async function injectHtmlFragments(html, storage) {
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
