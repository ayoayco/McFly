#!/usr/bin/env node

import { consola } from 'consola'
import { defineCommand, type ParsedArgs } from 'citty'
import { dirname, resolve } from 'pathe'
import { fileURLToPath } from 'node:url'
import { getMcFlyConfig } from '../get-config.js'

async function _build(args: ParsedArgs) {
  consola.start('Building project...')
  try {
    // TODO: check for dir type (should be string)
    const dir: string = args.dir?.toString() || args._dir?.toString() || '.'
    const rootDir = resolve(dir)

    const { mcflyConfig, configFile } = await getMcFlyConfig()

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    consola.info('dir', __dirname)
  } catch (err) {
    consola.error(err)
  }
}

export default defineCommand({
  meta: {
    name: 'build',
    description: 'Builds the McFly project for production.',
  },

  args: {
    dir: {
      type: 'string',
      description: 'project root directory',
    },
    _dir: {
      type: 'positional',
      default: '.',
      description: 'project root directory (prefer using `--dir`)',
    },
    minify: {
      type: 'boolean',
      description:
        'Minify the output (overrides preset defaults you can also use `--no-minify` to disable).',
    },
    preset: {
      type: 'string',
      description:
        'The build preset to use (you can also use `NITRO_PRESET` environment variable).',
    },
    compatibilityDate: {
      type: 'string',
      description:
        'The date to use for preset compatibility (you can also use `NITRO_COMPATIBILITY_DATE` environment variable).',
    },
  },
  async run({ args }) {
    await _build(args)
  },
})

export const exportedForTest = {
  build: _build,
}
