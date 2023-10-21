// @ts-check

import { eventHandler } from "h3";
import { ELEMENT_NODE, parse, render, renderSync, walkSync } from "ultrahtml";
import { parseScript } from "esprima";

export function defineRoute({ config, storage }) {
  return eventHandler(async (event) => {
    const { path } = event;
    const { components: componentType } = config();
    let html = await getHtml(path, storage);

    const transforms = [doSetUp, deleteServerScripts];
    if (html) {
      for (const transform of transforms) {
        html = transform(html.toString());
      }
    }

    html = await useFragments(html.toString(), storage);

    if (!!componentType && !!html) {
      html = await insertRegistry(html.toString(), componentType, storage);
    }

    return html ?? new Response("Not found", { status: 404 });
  });
}

const getHtml = async (path, storage) => {
  const rawPath = path[path.length - 1] === "/" ? path.slice(0, -1) : path;
  const filename = rawPath === "" ? "/index.html" : `${rawPath}.html`;
  const fallback = getPath(rawPath + "/index.html");
  const filePath = getPath(filename);
  let html = await storage.getItem(filePath);
  if (!html) html = await storage.getItem(fallback);
  if (!html) html = await storage.getItem(getPath("/404.html"));

  return html;
};

/**
 *
 * @param {string} filename
 * @returns string
 */
function getPath(filename) {
  return `assets/pages${filename}`;
}

/**
 *
 * @param {string} html
 * @param {"js" | "ts"} type
 * @returns Promise<string>
 */
async function insertRegistry(html, type, storage) {
  const ast = parse(html);
  const componentFiles = await getFiles(type, storage);
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
    const registryScript = await buildRegistry(
      usedCustomElements,
      type,
      storage
    );
    walkSync(ast, (node) => {
      if (node.type === ELEMENT_NODE && node.name === "head") {
        node.children.push(parse(registryScript));
      }
    });
  }

  return render(ast);
}

/**
 *
 * @param {Array<string>} usedCustomElements
 * @param {"js" | "ts"} type
 * @returns
 */
async function buildRegistry(usedCustomElements, type, storage) {
  let registryScript = `<script type='module'>`;
  let isBaseClassImported = false;
  let classesImported = [];

  for (const name of usedCustomElements) {
    const content = await storage.getItem(`assets:components:${name}.${type}`);
    if (!content) continue;
    const evalStore = eval(
      `class WebComponent {}; class HTMLElement {}; (${content.toString()})`
    );
    const className = new evalStore().constructor.name;

    if (!classesImported.includes(className)) {
      if (
        !isBaseClassImported &&
        content.toString().includes("extends WebComponent")
      ) {
        const baseClassImport = `import { WebComponent } from "https://unpkg.com/web-component-base@1.9.1/WebComponent.mjs";`;

        registryScript += baseClassImport;
        isBaseClassImported = true;
      }

      registryScript += content;

      registryScript += `customElements.define("${name}", ${className});`;
      classesImported.push(className);
    }
  }

  registryScript += "</script>";

  return registryScript;
}

/**
 *
 * @param {string} html
 * @returns string
 */
function doSetUp(html) {
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
  serverScripts.forEach((script) => {
    const { body } = parseScript(script);
    const keys = body
      .filter((n) => n.type === "VariableDeclaration")
      .map((n) => n["declarations"][0].id.name);
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

/**
 *
 * @param {string} html
 * @returns string
 */
function deleteServerScripts(html) {
  const ast = parse(html);
  walkSync(ast, (node) => {
    const { attributes } = node;
    const attributeKeys = Object.keys(attributes ?? {});
    const isServerScript = attributeKeys.some((key) => key.includes("server:"));
    if (isServerScript && !!node.parent) {
      node.parent.children.splice(node.parent.children.indexOf(node), 1);
    }
  });

  return renderSync(ast);
}

/**
 *
 * @param {Array<string>} scripts
 * @returns string
 */
function cleanScript(scripts) {
  let script = scripts.map((s) => s.trim()).join(" ");

  script = removeComments(script);

  return script.replace(/\n/g, "").replace(/\s+/g, " ");
}

/**
 *
 * @returns boolean
 */
function isComment(node) {
  return (
    node.type === "Line" ||
    node.type === "Block" ||
    node.type === "BlockComment" ||
    node.type === "LineComment"
  );
}

/**
 *
 * @param {string} script
 * @returns string
 */
function removeComments(script) {
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

/**
 *
 * @param {string} html
 * @returns Promise<string>
 */
async function useFragments(html, storage) {
  const fragmentFiles = await getFiles("html", storage);

  const availableFragments = fragmentFiles.reduce((acc, key) => {
    return {
      ...acc,
      [key.replace(".html", "")]: "",
    };
  }, {});
  const ast = parse(html);

  for (const key in availableFragments) {
    /**
     * @type string | null
     */
    let text = await storage.getItem("assets:components:" + key + ".html");
    if (!text) continue;
    availableFragments[key] = text.replace(/\n/g, "").replace(/\s+/g, " ");
  }

  walkSync(ast, (node) => {
    const selector = Object.keys(availableFragments).find(
      (name) => name === node.name
    );

    if (node.type === ELEMENT_NODE && !!selector) {
      const index = node.parent.children.indexOf(node);
      const fragmentNode = parse(availableFragments[selector]);

      replaceSlots(fragmentNode, node);

      node.parent.children[index] = fragmentNode;
    }
  });

  return render(ast);
}

function replaceSlots(fragmentNode, node) {
  walkSync(fragmentNode, (n) => {
    if (n.type === ELEMENT_NODE && n.name === "slot") {
      const index = n.parent.children.indexOf(n);
      n.parent.children.splice(index, 1, ...node.children);
    }
  });
}

/**
 *
 * @param {string} type
 */
async function getFiles(type, storage) {
  return (await storage.getKeys("assets:components"))
    .map((key) => key.replace("assets:components:", ""))
    .filter((key) => key.includes(type));
}
