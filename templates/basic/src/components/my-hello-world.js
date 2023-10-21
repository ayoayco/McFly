/**
 * Custom element using a minimal Web Component Base class
 * @see https://ayco.io/n/web-component-base
 */
class HelloWorld extends WebComponent {
  static properties = ["data-name"];

  onInit() {
    let count = 0;
    this.onclick = () => {
      this.setAttribute("data-name", `Clicked ${++count}x`);
    };
  }

  get template() {
    /**
     * any attribute/property in kebab-case...
     * can be accessed via its camelCase counterpart
     * example: data-name prop is accessible as this.dataName
     */
    return `<button style="cursor:pointer">Hello ${this.dataName}!</button>`;
  }
}
