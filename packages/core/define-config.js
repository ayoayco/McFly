/**
 * @typedef {{
 *  components: 'js'
 * }} McFlyConfig
 */

/**
 * Define the configuration for the McFly project
 * @param {McFlyConfig} config
 * @returns {function(): McFlyConfig}
 */
export function defineMcFlyConfig(config) {
  return () => config
}
