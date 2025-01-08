import { defineMcFlyConfig } from '@mcflyjs/config'

export default defineMcFlyConfig({
  components: 'js',
  server: {
    logs: true,
  },
  plugins: [
    {
      'mcfly:page:rendered': () => console.log('>>> page rendered'),
      'mcfly:scripts:evaluated': () => console.log('>>> scripts evaluated'),
      'mcfly:fragments:injected': () => console.log('>>> fragments injected'),
      'mcfly:elements:injected': () => console.log('>>> elements injected'),
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
