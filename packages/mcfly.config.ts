import { NitroConfig } from "nitropack";

export default function McFly(): NitroConfig {
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
