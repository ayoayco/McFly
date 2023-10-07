//https://nitro.unjs.io/config
export default defineNitroConfig({
  devStorage: {
    db: {
      driver: "fs",
      base: "./data/db",
    },
  },
});
