class CodeBlockComponent extends HTMLElement {
  connectedCallback() {
    this.trimmed = this.innerHTML.trim();
    const lang = this.getAttribute("language");

    this.innerHTML = `
        <pre id="pre" style="padding:1em;background:#efefef;margin:1em 0;border-radius:5px;font-size:large;"><code id="code">${
      this.trimmed
    }</code></pre>
    `;

    if (lang) {
      const pre = this.querySelector('#pre')
      pre.className = `language-${lang}`;
    }

  }
}
