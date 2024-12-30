#!/usr/bin/env node

import { consola } from 'consola'
import { colorize } from 'consola/utils'
import { defineCommand } from 'citty'
import { createRequire } from 'node:module'
import { createNitro } from 'nitropack'
import { createDevServer, prepare } from 'nitropack'
import { build } from 'nitropack'
// import { parseArgs } from 'node:util'
import { resolve } from 'pathe'
import { loadConfig } from 'c12'

const hmrKeyRe = /^runtimeConfig\.|routeRules\./

async function printInfo() {
  try {
    const _require = createRequire(import.meta.url)
    const mcflyPkg = await _require('@mcflyjs/core/package.json')
    const mcflyPkgVersion = `McFly ${colorize('bold', mcflyPkg.version)}`
    const nitroPkg = await _require('nitropack/package.json')
    const nitroPkgVersion = `Nitro ${nitroPkg.version}`
    consola.log(
      `${colorize('blue', mcflyPkgVersion)} ${colorize('dim', nitroPkgVersion)}`
    )
  } catch (e) {
    consola.error(e)
  }
}

async function serve(args) {
  try {
    /**
     * @type {string}
     */
    const rootDir = resolve(args.dir || args._dir || '.')
    const { config: mcflyConfig } = await loadConfig({ name: 'mcfly' })
    const { config: nitroConfig } = await loadConfig({ name: 'nitro' })

    /**
     * @typedef {import('nitropack').Nitro} Nitro
     * @type {Nitro}
     */
    let nitro
    const reload = async () => {
      if (nitro) {
        consola.info('Restarting dev server...')
        if ('unwatch' in nitro.options._c12) {
          await nitro.options._c12.unwatch()
        }
        await nitro.close()
      }
      nitro = await createNitro(
        {
          extends: '@mcflyjs/config',
          rootDir,
          dev: true,
          preset: 'nitro-dev',
          _cli: { command: 'dev' },
          // spread mcfly.nitro config
          ...(mcflyConfig.nitro ?? {}),
          ...(nitroConfig ?? {}),
        },
        {
          watch: true,
          c12: {
            async onUpdate({ getDiff, newConfig }) {
              const diff = getDiff()

              if (diff.length === 0) {
                return // No changes
              }

              consola.info(
                'Nitro config updated:\n' +
                  diff.map((entry) => `  ${entry.toString()}`).join('\n')
              )

              await (diff.every((e) => hmrKeyRe.test(e.key))
                ? nitro.updateConfig(newConfig.config || {}) // Hot reload
                : reload()) // Full reload
            },
          },
        }
      )
      nitro.hooks.hookOnce('restart', reload)
      const server = createDevServer(nitro)
      // const listenOptions = parseArgs(args)
      await server.listen(1234)
      await prepare(nitro)
      await build(nitro)
    }
    await reload()
  } catch (e) {
    consola.error(e)
  }
}

export default defineCommand({
  meta: {
    name: 'prepare',
    description: 'Runs the dev server.',
  },
  async run({ args }) {
    await printInfo()
    await serve(args)
  },
})

export const exportedForTest = {
  serve,
  printInfo,
}
