import { existsSync, promises as fsp } from "node:fs";

export default function registerComponents() {
  return () => {
    copyComponents();
    buildRegistry();
  };
}

const copyComponents = async () => {
  const rawKeys = await useStorage().getKeys("assets:components");
  rawKeys.forEach(async (key) => {
    const cleanKey = key.replace("assets:components:", "");
    const content = await useStorage().getItem(key);
    if (!existsSync("./public/.output")) await fsp.mkdir("./public/.output");
    await fsp.writeFile(`./public/.output/${cleanKey}`, content.toString());
  });
};

const buildRegistry = async () => {
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

  if (!existsSync("./public")) await fsp.mkdir("./public");
  if (!existsSync("./public/.output")) await fsp.mkdir("./public/.output");

  await fsp.writeFile(
    "./public/.output/registry.js",
    [...imports, registryObject, customElementsDefine].join(";")
  );
};
