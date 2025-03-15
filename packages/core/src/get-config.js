import { loadConfig } from 'c12'
import { mcflyNitroConfig } from './mcfly-nitro-config.js'

/**
 * @typedef {import('nitropack').NitroConfig} NitroConfig
 */

/**
 * Create a valid Nitro configuration given a McFly config object
 * @returns {Promise<NitroConfig>}
 */
export async function getNitroConfig(mcflyConfig = {}) {
  const { config: nitroConfig } = await loadConfig({ name: 'nitro' })
  return {
    // nitro config in mcfly config
    ...mcflyConfig.nitro,

    // nitro config from nitro config
    ...(nitroConfig ?? {}),

    // McFly standard nitro config
    ...mcflyNitroConfig,
  }
}

export async function getMcFlyConfig() {
  const { config: mcflyConfig, configFile } = await loadConfig({
    name: 'mcfly',
  })

  return [mcflyConfig, configFile]
}
