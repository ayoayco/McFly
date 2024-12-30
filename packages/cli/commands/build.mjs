#!/usr/bin/env node

import { consola } from 'consola'
import { defineCommand } from 'citty'
import { resolve } from 'pathe'
import { loadConfig } from 'c12'
import {
  build,
  copyPublicAssets,
  createNitro,
  prepare,
  prerender,
} from 'nitropack'

async function _build(args) {
  consola.start('Building project...')
  try {
    const rootDir = resolve(args.dir || args._dir || '.')
    const { config: mcflyConfig } = await loadConfig({ name: 'mcfly' })
    const { config: nitroConfig } = await loadConfig({ name: 'nitro' })

    const nitro = await createNitro({
      extends: '@mcflyjs/config',
      rootDir,
      dev: false,
      minify: args.minify,
      preset: args.preset,
      // spread mcfly.nitro config
      ...(mcflyConfig.nitro ?? {}),
      ...(nitroConfig ?? {}),
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
    name: 'prepare',
    description: 'Builds the McFly project for production.',
  },

  args: {
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
  build,
}
