/**
 * McFly SSR logic
 * 👋 this is not the route you're looking for
 * ...pages are in ./src/pages
 * ...components/fragments are in ./src/components
 * @see more on https://ayco.io/gh/McFly
 */
import { defineRoute } from "@mcflyjs/core/event-handler.mjs";
import config from "../mcfly.config.mjs";
export default defineRoute({ config, storage: useStorage() });
