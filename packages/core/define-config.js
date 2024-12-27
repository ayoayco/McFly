/**
 * @typedef {Object} McFlyConfig
 * @property {'js' | 'lit'} components
 * Type of components used:
 * - `'js'` = Vanilla
 * - `'lit'` = Lit
 */

/**
 * Define the configuration for the McFly project
 * @param {McFlyConfig} config
 * @returns {function(): McFlyConfig}
 */
export function defineMcFlyConfig(config) {
  return () => config
}
