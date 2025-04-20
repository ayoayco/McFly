import type { NitroConfig } from 'nitropack'

/**
 * TODO: fix types
 * - plugins missing
 */
export type McFlyConfig = {
  components: 'js' | 'lit'
  nitro?: NitroConfig
}

/**
 * Define the configuration for the McFly project
 * @param {McFlyConfig} config
 * @returns {function(): McFlyConfig}
 */
export function defineMcFlyConfig(config: McFlyConfig) {
  return () => config
}
