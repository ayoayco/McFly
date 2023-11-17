/**
 * Custom element using a minimal Web Component Base class
 * @see https://ayco.io/n/web-component-base
 */
class MyHelloWorld extends WebComponent {
  // tell browser which props to cause render
  static properties = ["data-name"];

  // Triggered when the component is connected to the DOM
  onInit() {
    let count = 0;
    this.dataset.name = this.dataset.name ?? 'World';
    this.onclick = () => this.dataset.name = `Clicked ${++count}x`
  }

  // give readonly template
  get template() {
    return `<button style="cursor:pointer">Hello ${this.dataset.name}!</button>`;
  }
}
