import {coverageConfigDefaults, defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    reporters: ['html'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: 'html',
      exclude: ['html/**', ...coverageConfigDefaults.exclude]
    }
  },
})
