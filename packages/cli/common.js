import { resolve } from 'pathe'
import { loadConfig } from 'c12'

export const localNitroConfig = async (args) => {
  /**
   * @type {string}
   */
  const rootDir = resolve(args.dir || args._dir || '.')
  const { config: mcflyConfig } = await loadConfig({ name: 'mcfly' })
  const { config: nitroConfig } = await loadConfig({ name: 'nitro' })

  return {
    extends: '@mcflyjs/config',
    rootDir,
    dev: true,
    preset: 'nitro-dev',
    _cli: { command: 'dev' },
    // spread mcfly.nitro config
    ...(mcflyConfig.nitro ?? {}),
    ...(nitroConfig ?? {}),
  }
}
