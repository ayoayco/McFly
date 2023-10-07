import * as fs from "fs";
export default eventHandler(async (event) => {
  const filename = event.path === "/" ? "/index.html" : `${event.path}.html`;
  const fallback = getPath(event.path + "/index.html");
  const path = getPath(filename);
  let html = "";

  try {
    html = await useStorage().getItem(path);
  } catch (error) {
    try {
      html = await useStorage().getItem(fallback);
    } catch {
      html = `cannot find ${path} or ${fallback}`;
    }
  }

  return html;
});

function getPath(filename: string) {
  return `assets/pages${filename}`;
}
