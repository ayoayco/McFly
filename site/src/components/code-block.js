class CodeBlockComponent extends HTMLElement {
  connectedCallback() {
    this.trimmed = this.innerHTML.trim();
    const lang = this.getAttribute("language");

    this.innerHTML = `
        <pre id="pre"><code id="code">${this.trimmed}</code></pre>
    `;

    /**
     * @type {HTMLPreElement}
     */
    const pre = this.querySelector("#pre");

    if (lang) {
      pre.className = `language-${lang}`;
    }

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
}
