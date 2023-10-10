import { WebComponent } from "https://unpkg.com/web-component-base@1.6.15/WebComponent.js";

export default class HelloWorld extends WebComponent {
  name = "";
  static properties = ["name"];

  onInit() {
    console.log(`Greeting for ${this.name} initialized`);
    let count = 0;
    this.onclick = () => {
      console.log("Clicked!");
      this.setAttribute("name", `I was clicked ${++count} times!`);
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
