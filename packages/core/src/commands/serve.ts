#!/usr/bin/env node

import { consola } from 'consola'
import { colorize } from 'consola/utils'
import { defineCommand, type ParsedArgs } from 'citty'
import { createRequire } from 'node:module'
import { resolve } from 'pathe'
// import { fileURLToPath } from 'node:url'
// import { dirname } from 'pathe'
import { getMcFlyConfig } from '../get-config.js'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

async function printInfo() {
  try {
    const _require = createRequire(import.meta.url)
    const mcflyPkg = await _require('@mcflyjs/core/package.json')
    const mcflyPkgVersion = `McFly ${colorize('bold', mcflyPkg.version)}`
    consola.log(`${colorize('blue', mcflyPkgVersion)}`)
  } catch (e) {
    consola.error(e)
  }
}

async function serve(args: ParsedArgs) {
  try {
    // TODO: check for dir type (should be string)
    const dir = args.dir?.toString() || args._dir?.toString()
    const rootDir: string = resolve(dir || '.')

    const { mcflyConfig } = await getMcFlyConfig()

    /**
     * TODO: config
     * - separate `start` & `dev` commands
     * - srcDir, apiDir ?
     * - autoLoad config
     * - fastify config
     */
    if (mcflyConfig.server)
      mcflyConfig.server.serve({
        rootDir: rootDir + '/src',
        apiDir: '/api',
        logger: consola,
      })
    else consola.error('[McFly]: `server` configuration required')
  } catch (e) {
    consola.error(e)
  }
}

export default defineCommand({
  meta: {
    name: 'serve',
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
