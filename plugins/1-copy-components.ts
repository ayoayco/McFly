import * as fs from "fs";
export default defineNitroPlugin(async () => {
  console.log("Copying components to public folder...");
  const rawKeys = await useStorage().getKeys("assets:components");
  rawKeys.forEach(async (key) => {
    const cleanKey = key.replace("assets:components:", "");
    const content = await useStorage().getItem(key);
    if (!fs.existsSync("./public/.output")) fs.mkdirSync("./public/.output");
    fs.writeFileSync(`./public/.output/${cleanKey}`, content.toString());
  });
});
