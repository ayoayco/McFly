import WebComponent from "https://unpkg.com/web-component-base/index.js";

export default class HelloWorld extends WebComponent {
  name = "";
  static properties = ["name"];

  onInit() {
    console.log(`Greeting for ${this.name} initialized`);
    let count = 0;
    this.onclick = () => {
      console.log("Clicked!");
      this.name = `I was clicked ${++count} times`;
      this.render();
    };
    this.style.cursor = "pointer";
    this.setAttribute("title", "Click me please");
  }

  get template() {
    return `Hello ${this.name}! <small>I am interactive</small>`;
  }
}
