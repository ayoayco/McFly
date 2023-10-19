class HelloWorld extends WebComponent {
  static properties = ["name"];

  onInit() {
    let count = 0;
    this.onclick = () => {
      this.setAttribute("name", `Clicked ${++count}x`);
    };
    this.setAttribute("title", "Click me please");
  }

  get template() {
    return `<button style="cursor:pointer">Hello ${this.name}!</button>`;
  }
}
