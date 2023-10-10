import { ELEMENT_NODE, parse, walkSync } from "ultrahtml";

export default eventHandler(async (event) => {
  const rawPath =
    event.path[event.path.length - 1] === "/"
      ? event.path.slice(0, -1)
      : event.path;
  const filename = rawPath === "" ? "/index.html" : `${rawPath}.html`;
  const fallback = getPath(rawPath + "/index.html");
  const path = getPath(filename);
  let html = await useStorage().getItem(path);
  if (!html) html = await useStorage().getItem(fallback);
  if (!html) html = await useStorage().getItem(getPath("/404.html"));

  // transforms
  const transforms = [insertRegistry, doSetUp];
  if (html) {
    for (const transform of transforms) {
      html = transform(html.toString());
    }
  }

  /**
   * TODO remove server:script tags
   */

  return html ?? new Response("Not found", { status: 404 });
});

function getPath(filename: string) {
  return `assets/pages${filename}`;
}

function insertRegistry(html: string): string {
  // temporary; use ultrahtml later
  const registryScript =
    '<script type="module" src="./.output/registry.js"></script>';

  return html.toString().replace("</head>", registryScript + "</head>");
}

function doSetUp(html: string) {
  const ast = parse(html);
  const serverScripts = [];
  walkSync(ast, (node) => {
    const { attributes } = node;
    const attributeKeys = Object.keys(attributes ?? {});
    const isServerScript = attributeKeys.some((key) => key.includes("server:"));
    const isInHead = node.parent?.name === "head";
    if (
      node.type === ELEMENT_NODE &&
      node.name === "script" &&
      isServerScript &&
      isInHead
    ) {
      const scripts = node.children.map((child) => child.value);
      serverScripts.push(scripts.join(" "));
    }
  });

  const setupMap = {};
  serverScripts.forEach((script: string) => {
    const constructor = `
    new Function(\`${script}\`);
    `;
    const evalStore = eval(constructor);
    Object.assign(setupMap, new evalStore());
  });

  return html.replace("{{name}}", setupMap["name"]);
}
