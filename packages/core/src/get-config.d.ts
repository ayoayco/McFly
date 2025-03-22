/**
 * @typedef {import('nitropack').NitroConfig} NitroConfig
 */
/**
 * Create a valid Nitro configuration given a McFly config object
 * @returns {Promise<NitroConfig>}
 */
export function getNitroConfig(mcflyConfig?: {}): Promise<NitroConfig>
export function getMcFlyConfig(): Promise<{
  mcflyConfig: import('c12').UserInputConfig
  configFile: string | undefined
}>
export type NitroConfig = import('nitropack').NitroConfig
