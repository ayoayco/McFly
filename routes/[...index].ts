/**
 * McFly SSR logic
 */

import { ELEMENT_NODE, parse, render, renderSync, walkSync } from "ultrahtml";
import { parseScript } from "esprima";
import config from "../mcfly.config";

export default eventHandler(async (event) => {
  const { path } = event;
  let html = await getHtml(path);

  const { components: componentType } = config();

  // transforms
  const transforms = [doSetUp, deleteServerScripts];
  if (html) {
    for (const transform of transforms) {
      html = transform(html.toString());
    }
  }

  if (!!componentType && !!html) {
    html = await insertRegistry(html.toString(), componentType);
  }

  return html ?? new Response("Not found", { status: 404 });
});

const getHtml = async (path: string) => {
  const rawPath = path[path.length - 1] === "/" ? path.slice(0, -1) : path;
  const filename = rawPath === "" ? "/index.html" : `${rawPath}.html`;
  const fallback = getPath(rawPath + "/index.html");
  const filePath = getPath(filename);
  let html = await useStorage().getItem(filePath);
  if (!html) html = await useStorage().getItem(fallback);
  if (!html) html = await useStorage().getItem(getPath("/404.html"));

  return html;
};

function getPath(filename: string) {
  return `assets/pages${filename}`;
}

async function insertRegistry(
  html: string,
  type: "js" | "ts"
): Promise<string> {
  const ast = parse(html);
  const componentFiles = (await useStorage().getKeys("assets:components"))
    .map((key) => key.replace("assets:components:", ""))
    .filter((key) => key.includes(type));
  const availableComponents = componentFiles.map((key) =>
    key.replace(`.${type}`, "")
  );

  const usedCustomElements = [];

  walkSync(ast, (node) => {
    const usedElement = availableComponents.find((name) => name === node.name);

    if (node.type === ELEMENT_NODE && !!usedElement) {
      usedCustomElements.push(usedElement);
    }
  });

  // insert registry script to head
  if (usedCustomElements.length > 0) {
    const registryScript = await buildRegistry(usedCustomElements, type);
    walkSync(ast, (node) => {
      if (node.type === ELEMENT_NODE && node.name === "head") {
        node.children.push(parse(registryScript));
      }
    });
  }

  return render(ast);
}

async function buildRegistry(usedCustomElements: string[], type: "js" | "ts") {
  let registryScript = `<script type='module'>
import { WebComponent } from "https://unpkg.com/web-component-base@1.6.15/WebComponent.js";
`;

  for (const name of usedCustomElements) {
    const content = await useStorage().getItem(
      `assets:components:${name}.${type}`
    );
    registryScript += content;
    const evalStore = eval(`class WebComponent {};(${content.toString()})`);
    const className = new evalStore().constructor.name;

    registryScript += `customElements.define("${name}", ${className});`;
  }

  registryScript += "</script>";

  return registryScript;
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
      const script = cleanScript(scripts);
      serverScripts.push(script);
    }
  });

  const setupMap = {};
  serverScripts.forEach((script: string) => {
    const { body } = parseScript(script);
    const keys = body
      .filter((node) => node.type === "VariableDeclaration")
      .map((node) => node.declarations[0].id.name);
    const constructor = `(function(){}.constructor)(\`${script}; return {${keys.join(
      ","
    )}}\`);`;
    const evalStore = eval(constructor);
    Object.assign(setupMap, new evalStore());
  });

  const regex = /{{(.*?)}}/g;
  var match;

  while ((match = regex.exec(html))) {
    let [key, value] = match;
    value = value.replace(/\s/g, "");
    html = html.replace(key, setupMap[value]);
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

function cleanScript(scripts: string[]): string {
  let script = scripts.map((s) => s.trim()).join(" ");

  script = removeComments(script);

  return script.replace(/\n/g, "").replace(/\s+/g, " ");
}

function isComment(node) {
  return (
    node.type === "Line" ||
    node.type === "Block" ||
    node.type === "BlockComment" ||
    node.type === "LineComment"
  );
}

function removeComments(script: string) {
  const entries = [];
  parseScript(script, { comment: true }, function (node, meta) {
    if (isComment(node)) {
      entries.push({
        start: meta.start.offset,
        end: meta.end.offset,
      });
    }
  });

  entries
    .sort((a, b) => {
      return b.end - a.end;
    })
    .forEach((n) => {
      script = script.slice(0, n.start) + script.slice(n.end);
    });
  return script;
}
