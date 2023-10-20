class HelloWorld extends WebComponent {
  static properties = ["data-name"];

  onInit() {
    let count = 0;
    this.onclick = () => {
      this.setAttribute("data-name", `Clicked ${++count}x`);
    };
    this.setAttribute("title", "Click me please");
  }

  get template() {
    return `<button style="cursor:pointer">Hello ${this["data-name"]}!</button>`;
  }
}
