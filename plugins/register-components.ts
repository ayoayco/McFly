import * as fs from "fs";
/**
 build registry of custom elements
 */

export default defineNitroPlugin(async () => {
  console.log("Building registry of custom elements...");
  const rawKeys = await useStorage().getKeys("/assets/components");
  const keys = rawKeys.map((key) => key.replace("assets:components:", ""));
  console.log("Found components:", keys);
  const imports = keys.map((key, index) => {
    return `import C${index} from "/components/${key}"`;
  });

  const registryObject = `
  const registry = {
    ${keys
      .map((key, index) => {
        const name = key.replace(".js", "").replace(".ts", "");
        return `"${name}": C${index}`;
      })
      .join(",")}
  }`;

  const customElementsDefine = `
  Object.keys(registry).forEach((key) => {
    if (window?.hasOwnProperty("customElements"))
      customElements.define(key, registry[key]);
  })`;

  fs.writeFileSync(
    "./public/registry.js",
    [...imports, registryObject, customElementsDefine].join(";")
  );
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
