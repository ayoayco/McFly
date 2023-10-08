export default eventHandler(async (event) => {
  const rawPath =
    event.path[event.path.length - 1] === "/"
      ? event.path.slice(0, -1)
      : event.path;
  const filename = rawPath === "" ? "/index.html" : `${rawPath}.html`;
  const fallback = getPath(rawPath + "/index.html");
  const path = getPath(filename);
  let html = await useStorage().getItem(path);
  if (!html) html = await useStorage().getItem(fallback);
  if (!html) html = await useStorage().getItem(getPath("/404.html"));

  // insert registry to head
  html = html
    .toString()
    .replace(
      "</head>",
      '<script type="module" src="./.output/registry.js"></script></head>'
    );

  return html ?? new Response("Not found", { status: 404 });
});

function getPath(filename: string) {
  return `assets/pages${filename}`;
}
