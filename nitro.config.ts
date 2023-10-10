//https://nitro.unjs.io/config
export default defineNitroConfig({
  preset: "vercel-static",
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
});
