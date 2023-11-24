import McFly from "@mcflyjs/config";
export default defineNitroConfig({
  ...McFly(),
  devServer: {
      watch: ["../packages"],
  },
  compressPublicAssets: {
    gzip: true,
    brotli: true,
  }
});
