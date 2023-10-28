declare global {
  class WebComponent extends import("web-component-base/WebComponent.mjs") {}
  const defineRoute: typeof import("@mcflyjs/core/event-handler.mjs").defineRoute;
}
export { WebComponent } from "web-component-base/WebComponent.mjs";
export { defineRoute } from "@mcflyjs/core/event-handler.mjs";
