export default defineNitroConfig({
  extends: '@mcflyjs/config',
  devServer: {
      watch: ["../packages"],
  },
  compressPublicAssets: {
    gzip: true,
    brotli: true,
  }
});
