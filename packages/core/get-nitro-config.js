import { loadConfig } from 'c12'
import { mcflyNitroConfig } from './mcfly-nitro-config.js'

/**
 * @typedef {import('nitropack').NitroConfig} NitroConfig
 */

/**
 * @returns {Promise<NitroConfig>}
 */
export async function getNitroConfig() {
  const { config: nitroConfig } = await loadConfig({ name: 'nitro' })
  const { config: mcflyConfig } = await loadConfig({ name: 'mcfly' })

  return {
    // nitro config within user's mcfly.config.mjs
    ...(mcflyConfig.nitro ?? {}),

    // nitro config from nitro.config.mjs
    ...(nitroConfig ?? {}),

    // McFly standard nitro config
    ...mcflyNitroConfig,
  }
}
