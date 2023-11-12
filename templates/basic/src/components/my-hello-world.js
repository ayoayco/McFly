/**
 * Custom element using a minimal Web Component Base class
 * @see https://ayco.io/n/web-component-base
 */
class MyHelloWorld extends WebComponent {
  // intialize props
  dataName = 'World';

  // tell browser which props to cause render
  static properties = ["data-name"];

  // Triggered when the component is connected to the DOM
  onInit() {
    let count = 0;
    // initialize event handler
    this.onclick = () => {
      this.setAttribute("data-name", `Clicked ${++count}x`);
    };
  }

  // give readonly template
  get template() {
    /**
     * any attribute/property in kebab-case...
     * can be accessed via its camelCase counterpart
     * example: data-name prop is accessible as this.dataName
     */
    return `<button style="cursor:pointer">Hello ${this.dataName}!</button>`;
  }
}
