class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  connectedCallback() {
    let count = 0;
    this.onclick = () => {
      this.setAttribute("name", `Clicked ${++count}x`);
    };
  }

  attributeChangedCallback(property, previousValue, currentValue) {
    if (previousValue !== currentValue) {
      this.innerHTML = `<button style="cursor:pointer">Hello ${currentValue}!</button>`;
    }
  }
}
