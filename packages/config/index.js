export { defineMcFlyConfig } from './define-mcfly-config.js'
import { nitroConfig } from './nitro-config.js'

/**
 * @typedef {import('nitropack').NitroConfig} NitroConfig
 * @typedef {import('./define-mcfly-config.js').McFlyConfig} McFlyConfig
 */

/**
 * Returns the Nitro configuration for a McFly project
 * @returns {NitroConfig}
 */
export default function () {
  return nitroConfig
}
