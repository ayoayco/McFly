import { parse, render, walk } from "ultrahtml";

/**
 * @class MetaDataTransformation
 * @implements {Transformation}
 */
export class MetaDataTransformation {

    /**
     * Add McFly metadata to the HTML
     */
    async transform(html) {
        const mcFlyVersion = 'McFly v0.0.1';
        const tagName = 'meta';
        const attributeName = 'generator';

        const ast = parse(html);
        await walk(ast, (node) => {
            if (node.name !== 'head') {
                return;
            }

            const existing = node.children?.find((child) => child.name === tagName && child.attributes?.name === attributeName);
            if (existing) {
                existing.attributes.content = mcFlyVersion;
                return;
            }

            node.children.push({
                name: tagName,
                attributes: {
                    name: attributeName,
                    content: mcFlyVersion,
                }
            });
        });
        return await render(ast);
    }
}

