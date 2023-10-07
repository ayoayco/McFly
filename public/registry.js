import HelloWorld from "/components/hello-world.js";

/**
 * Map of custom element name to the class constructor
 */
const registry = {
  "hello-world": HelloWorld,
};

Object.keys(registry).forEach((key) => {
  if (window?.hasOwnProperty("customElements"))
    customElements.define(key, registry[key]);
});
