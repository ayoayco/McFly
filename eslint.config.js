import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    ignores: [
      'dist/*',
      '.output/*',
      '.nitro/*',
      'node-modules*',
      'site/*',
      'templates/*',
    ],
  },
]
