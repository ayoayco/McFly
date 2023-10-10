import { ELEMENT_NODE, parse, renderSync, walkSync } from "ultrahtml";
import { parseScript } from "esprima";

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
  const transforms = [insertRegistry, doSetUp, deleteServerScripts];
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
    if (
      node.type === ELEMENT_NODE &&
      node.name === "script" &&
      isServerScript
    ) {
      const scripts = node.children.map((child) => child.value);
      serverScripts.push(scripts.join(" "));
    }
  });

  const setupMap = {};
  serverScripts.forEach((script: string) => {
    const { body } = parseScript(script);
    const keys = body
      .filter((node) => node.type === "VariableDeclaration")
      .map((node) => node.declarations[0].id.name);
    const constructor = `new Function(\`${script}; return {${keys.join(
      ","
    )}}\`);`;
    const evalStore = eval(constructor);
    Object.assign(setupMap, new evalStore());
  });

  const regex = /{{(.*?)}}/g;
  var match;

  let matches = [];
  while ((match = regex.exec(html)) != null) {
    console.log(match[0], match[1]);
    html = html.replace(match[0], setupMap[match[1].trim()]);
  }

  return html;
}

function deleteServerScripts(html: string): string {
  const ast = parse(html);
  walkSync(ast, (node) => {
    const { attributes } = node;
    const attributeKeys = Object.keys(attributes ?? {});
    const isServerScript = attributeKeys.some((key) => key.includes("server:"));
    if (isServerScript) {
      node.parent.children.splice(node.parent.children.indexOf(node), 1);
    }
  });

  return renderSync(ast);
}
