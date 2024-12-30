/**
 * @typedef {import('nitropack').NitroConfig} NitroConfig
 * @typedef {object} McFlyConfig
 * @property {'js' | 'lit'} components
 * Type of components used:
 * - `'js'` = Vanilla
 * - `'lit'` = Lit (in-progress)
 * - `'enhance'` = Enhance (in-progress)
 * - `'webc'` = WebC (in-progress)
 * @property {NitroConfig} nitro
 */

/**
 * Define the configuration for the McFly project
 * @param {McFlyConfig} config
 * @returns {function(): McFlyConfig}
 */
export function defineMcFlyConfig(config) {
  return () => config
}
