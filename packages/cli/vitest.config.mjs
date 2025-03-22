import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['html', 'text'],
      exclude: ['html/**', ...coverageConfigDefaults.exclude],
    },
  },
})
