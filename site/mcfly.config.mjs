import { defineMcFlyConfig } from '@mcflyjs/config'

export default defineMcFlyConfig({
  components: 'js',
  server: {
    logs: true,
  },
  plugins: [
    {
      'mcfly:page:rendered': () => console.log('>>> from site'),
    },
  ],
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
