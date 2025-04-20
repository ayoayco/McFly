import { ELEMENT_NODE, parse, renderSync, walkSync } from 'ultrahtml'
import { parseScript } from 'esprima'
import { consola } from 'consola'
import type { BaseNode as JsNode } from 'estree'

/**
 * @typedef {import('estree').BaseNode} JsNode
 */

/**
 * McFly HTML Template parser
 * @param {string} _html
 * @returns {string}
 */
export function evaluateServerScripts(_html: string) {
  let html = evaluateServerScript(_html)
  html = deleteServerScripts(html)
  return html
}

/**
 * Evaluates server:setup script and replaces all variables used in the HTML
 * @param {string} html
 * @returns {string}
 */
function evaluateServerScript(html: string) {
  const ast = parse(html)
  const serverScripts: string[] = []
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
      /**
       * TODO - fix types or replace esprima w/ acorn
       */
      // @ts-ignore
      .map((n) => n.declarations[0].id.name) //['declarations'][0].id.name)

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
    // TODO: remove any
    let setupCopy: any = setupMap

    // if not in the server script, it could be a js expression
    if (!(keys[0] in setupMap)) {
      try {
        finalValue = eval(rawValue)
      } catch (e) {
        consola.error('[ERR]: Failed to evaluate expression', e)
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
function deleteServerScripts(html: string) {
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
function cleanScript(scripts: string[]) {
  let script = scripts.map((s) => s.trim()).join(' ')

  script = removeComments(script)

  return script //.replace(/\n/g, '').replace(/\s+/g, ' ')
}

/**
 * Removes all instances of comments in a JS string
 * @param {string} script
 * @returns {string}
 */
function removeComments(script: string) {
  const entries: any[] = []
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
 * Checks if given node of a JS script is a comment
 * @param {JsNode} node
 * @returns {boolean}
 */
function isComment(node: JsNode) {
  return (
    node.type === 'Line' ||
    node.type === 'Block' ||
    node.type === 'BlockComment' ||
    node.type === 'LineComment'
  )
}
