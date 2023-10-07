import * as fs from "fs";
export default eventHandler((event) => {
  const filename = event.path === "/" ? "/index.html" : `${event.path}.html`;
  const fallback = getPath(event.path + "/index.html");
  const path = getPath(filename);
  let html = "";
  try {
    html = fs.readFileSync(path, "utf8");
  } catch (error) {
    try {
      html = fs.readFileSync(fallback, "utf8");
    } catch {
      html = `cannot find ${path} or ${fallback}`;
    }
  }

  return html;
});

function getPath(filename: string) {
  return `./pages${filename}`;
}
