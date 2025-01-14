#!/usr/bin/env node

import { consola } from 'consola'
import { defineCommand } from 'citty'
import { resolve } from 'pathe'
import { createNitro, writeTypes } from 'nitropack'
import { getMcFlyConfig, getNitroConfig } from '../../get-nitro-config.js'

async function prepare(args) {
  consola.start('Preparing McFly workspace...')

  let err

  try {
    const rootDir = resolve(args.dir || args._dir || '.')
    const [mcflyConfig] = await getMcFlyConfig()
    const nitroConfig = await getNitroConfig(mcflyConfig)
    const nitro = await createNitro({ rootDir, ...nitroConfig })

    await writeTypes(nitro)
  } catch (e) {
    consola.error(e)
    err = e
  }

  if (err) {
    consola.fail(
      'McFly workspace preparation failed. Please make sure dependencies are installed.\n'
    )
  } else consola.success('Done\n')
}

export default defineCommand({
  meta: {
    name: 'prepare',
    description: 'Prepares the McFly workspace.',
  },
  async run({ args }) {
    await prepare(args)
  },
})

export const exportedForTest = {
  prepare,
}
