import { ELEMENT_NODE, parse, render, walk } from "ultrahtml";
import { parseScript } from "esprima";

/**
 * @class ServerSideRendererTransformation
 * @implements {Transformation}
 */
export class ServerSideRendererTransformation {

    /**
     * Evaluates server:setup script and replaces all variables used in the HTML
     * @param html
     * @returns {Promise<string>}
     */
    async transform(html) {
        const ast = parse(html);
        const serverScripts = [];
        await walk(ast, (node) => {
            const {attributes} = node;
            const attributeKeys = Object.keys(attributes ?? {});
            const isServerScript = attributeKeys.some((key) => key.includes("server:"));
            if (
                node.type === ELEMENT_NODE &&
                node.name === "script" &&
                isServerScript
            ) {
                const scripts = node.children.map((child) => child.value);
                const script = this.cleanScript(scripts);
                serverScripts.push(script);
            }
        });

        const setupMap = {};
        serverScripts.forEach((script) => {
            const {body} = parseScript(script);
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
        let match;

        while ((match = regex.exec(html))) {
            let [key, value] = match;
            value = value.replace(/\s/g, "");
            // nested objects
            const keys = value.split('.');
            let finalValue = '';
            let setupCopy = setupMap;

            keys.forEach(i => {
                finalValue = setupCopy[i]
                setupCopy = finalValue;
            })

            html = html.replace(key, finalValue);
        }

        return this.deleteServerScripts(html);
    }

    /**
     * Cleans a JS string for save evaluation
     * @param {Array<string>} scripts
     * @returns {string}
     */
    cleanScript(scripts) {
        let script = scripts.map((s) => s.trim()).join(" ");

        script = this.removeComments(script);

        return script.replace(/\n/g, "").replace(/\s+/g, " ");
    }

    /**
     * Checks if given node of a JS script is a comment
     * @param {JsNode} node
     * @returns {boolean}
     */
    isComment(node) {
        return (
            node.type === "Line" ||
            node.type === "Block" ||
            node.type === "BlockComment" ||
            node.type === "LineComment"
        );
    }

    /**
     * Removes all instances of comments in a JS string
     * @param {string} script
     * @returns {string}
     */
    removeComments(script) {
        const entries = [];
        parseScript(script, {comment: true}, (node, meta) => {
            if (this.isComment(node)) {
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
     * Removes any instance of server:setup script in the HTML
     * @param {string} html
     * @returns {Promise<string>}
     */
    async deleteServerScripts(html) {
        const ast = parse(html);
        await walk(ast, (node) => {
            const { attributes } = node;
            const attributeKeys = Object.keys(attributes ?? {});
            const isServerScript = attributeKeys.some((key) => key.includes("server:"));
            if (isServerScript && !!node.parent) {
                node.parent.children.splice(node.parent.children.indexOf(node), 1);
            }
        });

        return render(ast);
    }
}