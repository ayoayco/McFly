class HelloWorld extends WebComponent {
  static properties = ["name"];

  onInit() {
    console.log(`Greeting for ${this.name} initialized`);
    let count = 0;
    this.onclick = () => {
      console.log("Clicked!");
      this.setAttribute("name", `Clicked ${++count}x`);
    };
    this.setAttribute("title", "Click me please");
  }

  onChanges(changes) {
    console.log(changes);
  }

  get template() {
    return `<button style="cursor:pointer">Hello ${this.name}!</button>`;
  }
}
