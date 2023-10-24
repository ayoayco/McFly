/**
 * Returns the Nitro configuration for a McFly project
 * @typedef {import('nitropack').NitroConfig} NitroConfig
 * @returns {NitroConfig}
 */
export default function McFly() {
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
  };
}
