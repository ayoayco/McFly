import * as fs from "fs";
export default eventHandler((event) => {
  const filename = event.path === "/" ? "/index.html" : `${event.path}.html`;
  const path = `./src/pages${filename}`;
  const html = fs.readFileSync(path, "utf8");
  return html;
});
