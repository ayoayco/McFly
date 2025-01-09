/**
 * @typedef {import('nitropack').NitroConfig} NitroConfig
 * @type {NitroConfig}
 */
export const nitroConfig = {
  framework: {
    name: 'McFly',
  },
  compatibilityDate: '2024-12-08',
  srcDir: 'src',
  apiDir: 'api',
  devServer: {
    watch: ['./pages', './components', './api'],
  },
  serverAssets: [
    {
      baseName: 'pages',
      dir: './pages',
    },
    {
      baseName: 'components',
      dir: './components',
    },
  ],
  imports: {
    presets: [
      {
        from: 'web-component-base',
        imports: ['WebComponent', 'html', 'attachEffect'],
      },
    ],
  },
}
