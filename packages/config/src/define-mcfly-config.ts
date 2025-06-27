import type { NitroConfig } from 'nitropack'

export type McFlyConfig = {
  components: 'js' | 'lit'
  nitro?: NitroConfig
  plugins?: McFlyPlugin[]
}

/**
 * Define the configuration for the McFly project
 * @param {McFlyConfig} config
 * @returns {function(): McFlyConfig}e
 */
export function defineMcFlyConfig(config: McFlyConfig) {
  return () => config
}

/**
 * TODO: finalize Plugin type
 */
export type McFlyPlugin = {}
