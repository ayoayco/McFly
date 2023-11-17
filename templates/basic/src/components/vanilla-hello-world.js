class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ["data-name"];
  }

  connectedCallback() {
    let count = 0;

    if (!('name' in this.dataset)) {
      this.dataset.name = 'World'
    }

    this.onclick = () => this.dataset.name = `Clicked ${++count}x`;
  }

  attributeChangedCallback(property, previousValue, currentValue) {
    if (property === "data-name" && previousValue !== currentValue) {
      this.innerHTML = `<button style="cursor:pointer">Hello ${currentValue}!</button>`;
    }
  }
}
