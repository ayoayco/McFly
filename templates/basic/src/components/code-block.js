// @ts-check
/**
 * Custom element using a minimal Web Component Base class
 * @see https://ayco.io/n/web-component-base
 */
class CodeBlockComponent extends WebComponent {
  // initialize props
  language;

  // tell browser which props to cause render
  static properties = ["language"];

  // Triggered after view is initialized
  afterViewInit() {
    /**
     * Provides autocompletion on IDEs when @ts-check is enabled on first line
     * @type {HTMLPreElement} */
    const pre = this.querySelector("#pre");

    /**
     * @type {Partial<CSSStyleDeclaration>}
     */
    const style = {
      background: "#f5f2f0",
      padding: "1em",
      margin: "1em 0",
      fontSize: "large",
      overflow: "auto",
      borderRadius: '5px'
    };

    Object.keys(style).forEach((rule) => {
      pre.style[rule] = style[rule];
    });
  }

  // readonly template
  get template() {
    const trimmed = this.innerHTML.trim();
    return `
        <pre class="${
          this.language && `language-${this.language}`
        }" id="pre"><code id="code">${trimmed}</code></pre>
    `;
  }
}
