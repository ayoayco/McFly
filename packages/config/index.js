/**
 * @typedef {import('nitropack').NitroConfig} NitroConfig
 */

/**
 * Returns the Nitro configuration for a McFly project
 * @returns {NitroConfig}
 */
export default function () {
  return {
    devServer: {
      watch: ["./src/pages", "./src/components"],
    },
    serverAssets: [
      {
        baseName: "pages",
        dir: "./src/pages",
      },
      {
        baseName: "components",
        dir: "./src/components",
      },
    ],
    imports: {
      presets: [
        {
          from: "web-component-base/WebComponent",
          imports: ["WebComponent", "html", "attachEffect"],
        },
        {
          from: "@mcflyjs/core",
          imports: ["useMcFlyRoute", "defineMcFlyConfig"],
        },
      ],
    },
  };
}
