import { existsSync, mkdirSync, writeFileSync } from "node:fs";

export default function components() {
  return () => {
    copyComponents();
    registerComponents();
  };
}

const copyComponents = async () => {
  console.log("Copying components to public folder...");
  const rawKeys = await useStorage().getKeys("assets:components");
  rawKeys.forEach(async (key) => {
    const cleanKey = key.replace("assets:components:", "");
    const content = await useStorage().getItem(key);
    if (!existsSync("./public/.output")) mkdirSync("./public/.output");
    writeFileSync(`./public/.output/${cleanKey}`, content.toString());
  });
};

const registerComponents = async () => {
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

  if (!existsSync("./public/.output")) {
    mkdirSync("./public/.output");
  }
  writeFileSync(
    "./public/.output/registry.js",
    [...imports, registryObject, customElementsDefine].join(";")
  );
};
