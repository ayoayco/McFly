/**
 * @typedef {import('nitropack').NitroConfig} NitroConfig
 * @type {NitroConfig}
 */
export const nitroConfig = {
  framework: {
    name: 'McFly',
  },
  compatibilityDate: '2024-12-08',
  devServer: {
    watch: ['./src/pages', './src/components'],
  },
  serverAssets: [
    {
      baseName: 'pages',
      dir: './src/pages',
    },
    {
      baseName: 'components',
      dir: './src/components',
    },
  ],
  imports: {
    presets: [
      {
        from: 'web-component-base',
        imports: ['WebComponent', 'html', 'attachEffect'],
      },
      {
        from: '@mcflyjs/core',
        imports: ['useMcFlyRoute'],
      },
    ],
  },
}
