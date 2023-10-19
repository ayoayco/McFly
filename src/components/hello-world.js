class HelloWorld extends HTMLElement {
  static observedAttributes = ["name"];

  connectedCallback() {
    console.log(`Greeting for ${this.name} initialized`);
    let count = 0;
    this.onclick = () => {
      console.log("Clicked!");
      this.setAttribute("name", `Clicked ${++count}x`);
    };
    this.setAttribute("title", "Click me please");
  }

  attributeChangedCallback(property, previousValue, currentValue) {
    if (previousValue !== currentValue) {
      this[property] = currentValue;
      this.innerHTML = `<button style="cursor:pointer">Hello ${this.name}!</button>`;
    }
  }
}
