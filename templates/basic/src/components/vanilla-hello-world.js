class HelloWorld extends HTMLElement {
    static get observedAttributes() {
      return ["data-name"];
    }
  
    connectedCallback() {
      let count = 0;
      this.onclick = () => {
        this.setAttribute("data-name", `Clicked ${++count}x`);
      };
    }
  
    attributeChangedCallback(property, previousValue, currentValue) {
      if (property === "data-name" && previousValue !== currentValue) {
        this.innerHTML = `<button style="cursor:pointer">Hello ${currentValue}!</button>`;
      }
    }
  }