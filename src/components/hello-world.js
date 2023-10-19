class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  connectedCallback() {
    let count = 0;
    this.onclick = () => {
      this.setAttribute("name", `Clicked ${++count}x`);
    };
    this.setAttribute("title", "Click me please");
  }

  attributeChangedCallback(property, previousValue, currentValue) {
    if (previousValue !== currentValue) {
      this[property] = currentValue;
      this.render();
    }
  }

  render() {
    this.innerHTML = `<button style="cursor:pointer">Hello ${this.name}!</button>`;
  }
}
