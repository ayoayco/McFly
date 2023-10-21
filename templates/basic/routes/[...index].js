/**
 * McFly SSR logic
 */
import { defineRoute } from "@mcflyjs/core/event-handler.mjs";
import config from "../mcfly.config.mjs";
export default defineRoute({ config, storage: useStorage() });
