import { nitroConfig } from './nitro-config.js'

import type { NitroConfig } from 'nitropack'

/**
 * Returns the Nitro configuration for a McFly project
 * @returns {NitroConfig}
 */
export default function (): NitroConfig {
  return nitroConfig
}

export { defineMcFlyConfig } from './define-mcfly-config.js'
export type { McFlyConfig } from './define-mcfly-config.js'

export const hello = 'world'
