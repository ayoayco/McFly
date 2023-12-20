import { ELEMENT_NODE, parse, render, walk, walkSync } from "ultrahtml";
import { getFiles } from "../utils/get-files.util.js";

/**
 * @class CustomElementTransformation
 * @implements {Transformation}
 */
export class CustomElementTransformation {

    constructor(storage, type) {
        this.storage = storage;
        this.type = type;
    }

    /**
     * @param {string} html
     * @returns {Promise<string>}
     */
    async transform(html) {
        const ast = parse(html);
        const componentFiles = await getFiles(this.type, this.storage);
        const availableComponents = componentFiles.map((key) =>
            key.replace(`.${this.type}`, "")
        );

        const usedCustomElements = [];

        await walk(ast, (node) => {
            const usedElement = availableComponents.find((name) => name === node.name);

            if (node.type === ELEMENT_NODE && !!usedElement) {
                usedCustomElements.push(usedElement);
            }
        });

        // insert registry script to head
        if (usedCustomElements.length > 0) {
            const registryScript = await this.buildRegistry(
                usedCustomElements,
                this.type,
                this.storage
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
     * Builds the string containing all custom elements definition
     * @param {Array<string>} usedCustomElements
     * @param {"js" | "ts"} type
     * @param {Storage} storage
     * @returns {Promise<string>}
     */
    async buildRegistry(usedCustomElements, type, storage) {
        let registryScript = `<script type='module'>`;
        let isBaseClassImported = false;
        let classesImported = [];

        for (const name of usedCustomElements) {
            const content = await storage.getItem(`assets:components:${name}.${type}`);
            if (!content) continue;
            const evalStore = eval(
                `class WebComponent {
                };

                class HTMLElement {
                };(${content.toString()})`
            );
            const className = new evalStore().constructor.name;

            if (!classesImported.includes(className)) {
                if (
                    !isBaseClassImported &&
                    content.toString().includes("extends WebComponent")
                ) {
                    const baseClassImport = `import { WebComponent, html, attachEffect } from "https://unpkg.com/web-component-base@2.0.6/index.js";`;
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
}