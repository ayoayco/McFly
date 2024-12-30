import { defineMcFlyConfig } from '@mcflyjs/config'

export default defineMcFlyConfig({
  components: 'js',
  nitro: {
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
