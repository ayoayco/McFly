class CodeBlockComponent extends HTMLElement {
  connectedCallback() {
    this.trimmed = this.innerHTML.trim();
    const lang = this.getAttribute("language");
    const lineNumbers = this.getAttribute("line-numbers") === "true";

    console.log(lineNumbers, lang);

    this.innerHTML = `
      <div>
        <pre class="language-${lang} ${
      lineNumbers ? "line-numbers" : ""
    }" id="pre" style="padding:1em;background:#efefef;margin:1em 0;border-radius:5px;overflow:scroll"><code id="code">${
      this.trimmed
    }</code></pre>
      </div>
    `;
  }
}
