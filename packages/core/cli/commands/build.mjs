#!/usr/bin/env node

import { consola } from 'consola'
import { defineCommand } from 'citty'
import { dirname, resolve } from 'pathe'
import {
  build,
  copyPublicAssets,
  createNitro,
  prepare,
  prerender,
} from 'nitropack'
import { fileURLToPath } from 'node:url'
import { getNitroConfig } from '../../get-nitro-config.js'

async function _build(args) {
  consola.start('Building project...')
  try {
    const rootDir = resolve(args.dir || args._dir || '.')

    const nitroConfig = await getNitroConfig()

    const nitro = await createNitro({
      rootDir,
      dev: false,

      ...nitroConfig,

      minify: args.minify,
      preset: args.preset,
    })

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    nitro.options.handlers.push({
      middleware: true,
      handler: resolve(__dirname, '../../route-middleware.js'),
    })

    await prepare(nitro)
    await copyPublicAssets(nitro)
    await prerender(nitro)
    await build(nitro)
    await nitro.close()
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
