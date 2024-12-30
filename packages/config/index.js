export { defineMcFlyConfig } from './define-mcfly-config.js'
import { nitroConfig } from './nitro-config.js'

/**
 * Returns the Nitro configuration for a McFly project
 * @returns {NitroConfig}
 */
export default function () {
  return nitroConfig
}
