class CodeBlockComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let lang = this.classList.value;
    lang = lang.replace("language-", "");

    const trimmed = this.innerHTML.trim();

    const template = `
      <div>
        <pre class="${this.classList}" id="pre"><code id="code">${trimmed}</code></pre>
      </div>
    `;

    this.innerHTML = template;
  }
}
