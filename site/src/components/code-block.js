class CodeBlockComponent extends HTMLElement {
  connectedCallback() {
    this.trimmed = this.innerHTML.trim();
    const lang = this.getAttribute("language");

    this.innerHTML = `
        <pre id="pre"><code id="code">${
      this.trimmed
    }</code></pre>
    `;

    /**
     * @type {HTMLPreElement}
     */
    const pre = this.querySelector('#pre')

    if (lang) {
      pre.className = `language-${lang}`;
    }

    /**
     * @type {Partial<CSSStyleDeclaration>}
     */
    const style = {
      padding:'1em',
      background:'#efefef',
      margin: '1em 0',
      borderRadius: '5px',
      fontSize: 'large'
    }

    Object.keys(style).forEach(rule => {
      pre.style[rule] = style[rule]
    })
  }
}
