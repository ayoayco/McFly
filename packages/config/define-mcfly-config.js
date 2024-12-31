/**
 * @typedef {import('nitropack').NitroConfig} NitroConfig
 * @typedef {object} ServerConfig
 * @property {boolean} logs
 * Set to true if you want to see server logs
 * @typedef {object} McFlyConfig
 * @property {'js' | 'lit'} components
 * Type of components used:
 * - `'js'` = Vanilla
 * - `'lit'` = Lit (in-progress)
 * - `'enhance'` = Enhance (in-progress)
 * - `'webc'` = WebC (in-progress)
 * @property {NitroConfig} nitro
 * @property {ServerConfig} server
 */

/**
 * Define the configuration for the McFly project
 * @param {McFlyConfig} config
 * @returns {function(): McFlyConfig}
 */
export function defineMcFlyConfig(config) {
  return () => config
}
