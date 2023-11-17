/**
 * Custom element using a minimal Web Component Base class
 * @see https://ayco.io/n/web-component-base
 */
class HelloWorld extends WebComponent {
  static properties = ["data-name"];

  onInit() {
    let count = 0;
    this.dataset.name = this.dataset.name ?? 'World';
    this.onclick = () => this.dataset.name = `Clicked ${++count}x`;
  }

  get template() {
    return `<button style="cursor:pointer">Hello ${this.dataset.name}!</button>`;
  }
}
