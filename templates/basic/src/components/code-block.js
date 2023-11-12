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

    // scoped style for pre block
    pre.style.background = "#f5f2f0";
    pre.style.padding = "1em";
    pre.style.margin = "1em 0";
    pre.style.fontSize = "1.25em";
    pre.style.overflow = "auto";
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
