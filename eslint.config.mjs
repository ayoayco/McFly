import globals from 'globals'
import pluginJs from '@eslint/js'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

const unused = 'hey'

console.log(unused)

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['site/*', 'templates/*'],
  },
]
