/**
 * Custom element using a minimal Web Component Base class
 * @see https://ayco.io/n/web-component-base
 */
class HelloWorld extends WebComponent {
  static properties = ["my-name"];

  onInit() {
    let count = 0;
    this.onclick = () => this.props.myName = `Clicked ${++count}x`;
  }

  get template() {
    return `<button style="cursor:pointer">Hello ${this.props.myName ?? 'World'}!</button>`;
  }
}
