/**
 * Custom element using a minimal Web Component Base class
 * @see https://ayco.io/n/web-component-base
 */
class HelloWorld extends WebComponent {
  dataName = 'World';

  static properties = ["data-name"];

  onInit() {
    let count = 0;
    this.onclick = () => this.dataset.name = `Clicked ${++count}x`;
  }

  get template() {
    return `<button style="cursor:pointer">Hello ${this.dataName}!</button>`;
  }
}
