/**
 * McFly SSR logic
 */
import McFly from "@mcflyjs/core/event-handler.mjs";
import config from "../mcfly.config";
export default McFly(config, useStorage());
