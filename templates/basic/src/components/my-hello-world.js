/**
 * Custom element using a minimal base class
 * @see https://WebComponent.io
 */
class MyHelloWorld extends WebComponent {
  static props = {
    myName: 'World',
    count: 0
  }

  updateLabel() {
    this.props.myName = `Clicked ${++this.props.count}x`
  }

  get template() {
    return html`
      <button onClick=${() => this.updateLabel()} style="cursor:pointer">
        Hello ${this.props.myName}!
      </button>`;
  }
}
