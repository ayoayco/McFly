import { eventHandler } from "h3";
import { ServerSideRendererTransformation } from "./transformations/server-side-renderer.transformation.js";
import { FragmentsTransformation } from "./transformations/fragments.transformation.js";
import { CustomElementTransformation } from "./transformations/custom-element.transformation.js";
import { MetaDataTransformation } from "./transformations/meta-data.transformation.js";
import { PageService } from "./services/page.service.js";


/**
 * Intercepts all routes and assembles the correct HTML to return
 * @param {{
 *  config: function(): Config,
 *  storage: Storage
 * }} param0
 * @returns {EventHandler}
 */
export function useMcFlyRoute({config, storage}) {
    return eventHandler(async (event) => {
        const {path} = event;
        const {components: componentType} = config();
        const pageService = new PageService();
        let html = await pageService.getHtml(path, storage);

        if (!html) {
            new Response(
                "😱 ERROR 404: Not found. You can put a 404.html on the ./src/pages directory to customize this error page.",
                {status: 404}
            );
        }

        const transformations = [
            new ServerSideRendererTransformation(),
            new FragmentsTransformation(storage),
            new CustomElementTransformation(storage, componentType),
            new MetaDataTransformation(),
        ];

        for (const transformation of transformations) {
            console.log('[RUNNING TRANSFORMATION]', transformation.constructor.name)
            html = await transformation.transform(html.toString());
        }

        return html;
    });
}







