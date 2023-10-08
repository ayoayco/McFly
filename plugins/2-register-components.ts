import * as fs from "fs";

export default defineNitroPlugin(async () => {
  console.log("Building registry of custom elements...");
  const rawKeys = await useStorage().getKeys("/assets/components");
  const keys = rawKeys.map((key) => key.replace("assets:components:", ""));
  console.log("Found components:", keys);
  const imports = keys.map((key, index) => {
    return `import C${index} from "./${key}"`;
  });

  const registryObject = `const registry = {
    ${keys
      .map((key, index) => {
        const name = key.replace(".js", "").replace(".ts", "");
        return `"${name}": C${index}`;
      })
      .join(",")}}`;

  const customElementsDefine = `Object.keys(registry).forEach((key) => {if(window?.hasOwnProperty("customElements"))customElements.define(key, registry[key]);})`;

  if (!fs.existsSync("./public/output")) {
    fs.mkdirSync("./public/output");
  }
  fs.writeFileSync(
    "./public/output/registry.js",
    [...imports, registryObject, customElementsDefine].join(";")
  );
});
