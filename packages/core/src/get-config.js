import { loadConfig } from 'c12'

export async function getMcFlyConfig() {
  const { config: mcflyConfig, configFile } = await loadConfig({
    name: 'mcfly',
  })

  return { mcflyConfig, configFile }
}
