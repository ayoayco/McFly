// @ts-check

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
export default function defineConfig(config) {
  return () => config;
}
