export default defineNitroConfig({
  extends: '@mcflyjs/config',

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
})
