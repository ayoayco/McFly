export type McFlyConfig = {
  server: McFlyServer
  components?: 'js' | 'lit'
  plugins?: McFlyPlugin[]
}

/**
 * Define the configuration for the McFly project
 * @param {McFlyConfig} config
 * @returns {function(): McFlyConfig}e
 */
export function defineConfig(config: McFlyConfig) {
  return () => config
}

/**
 * TODO: finalize Plugin type
 */
export type McFlyPlugin = {}

export type McFlyServer = any
