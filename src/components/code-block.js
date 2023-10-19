// @ts-check

class CodeBlockComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const trimmed = this.innerHTML.trim();

    this.css({
      color: "orange",
      margin: "1em 0",
      padding: "1em",
      fontWeight: "bold",
      fontSize: "x-large",
      display: "block",
      backgroundColor: "#eee",
    });

    const template = `
      <div>
        <pre class="language-${this.lang}" id="pre"><code id="code">${trimmed}</code></pre>
      </div>
    `;

    this.innerHTML = template;
  }

  /**
   * Apply css to an element
   * @param {Partial<CSSStyleDeclaration>} style
   * @param {HTMLElement} element
   */
  css(style, element = null) {
    let el = element ?? this;
    for (const property in style) el.style[property] = style[property];
  }
}
