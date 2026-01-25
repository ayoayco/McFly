// @ts-check
import { defineMcFlyConfig } from '@mcflyjs/config'
// import testPlugin from './test-plugin.mjs'
// import content from '@mcflyjs/content'

export default defineMcFlyConfig({
  components: 'js',
  // plugins: [testPlugin(), content()],
  nitro: {
    preset: 'netlify',
    devServer: {
      watch: ['../packages'],
    },
    routeRules: {
      '/chat': {
        redirect: {
          to: 'https://matrix.to/#/#mcfly:matrix.org',
          statusCode: 302,
        },
      },
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    compatibilityDate: '2024-12-08',
  },
})
