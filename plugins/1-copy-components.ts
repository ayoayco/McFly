import { mkdirSync, writeFileSync, existsSync } from "node:fs";

export default defineNitroPlugin(async () => {
  console.log("Copying components to public folder...");
  const rawKeys = await useStorage().getKeys("assets:components");
  rawKeys.forEach(async (key) => {
    const cleanKey = key.replace("assets:components:", "");
    const content = await useStorage().getItem(key);
    if (!existsSync("./public/.output")) mkdirSync("./public/.output");
    writeFileSync(`./public/.output/${cleanKey}`, content.toString());
  });
});
