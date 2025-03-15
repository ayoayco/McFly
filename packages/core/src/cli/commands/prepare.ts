#!/usr/bin/env node

import { consola } from 'consola'
import { defineCommand, type ParsedArgs } from 'citty'
import { resolve } from 'pathe'
import { createNitro, writeTypes } from 'nitropack'
import { getMcFlyConfig, getNitroConfig } from '../../get-config.js'

async function prepare(args: ParsedArgs) {
  consola.start('Preparing McFly workspace...')

  let err

  try {
    // TODO: check for dir type (should be string)
    const dir: string = args.dir?.toString() || args._dir?.toString() || '.'
    const rootDir = resolve(dir)
    const { mcflyConfig } = await getMcFlyConfig()
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
