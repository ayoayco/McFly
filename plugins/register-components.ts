/**
 build registry of custom elements
 */

export default defineNitroPlugin(async () => {
  console.log("Building registry of custom elements...");
  useStorage()
    .getKeys("/assets/components")
    .then((keys) => {
      keys.forEach((key) => {
        const name = key
          .replace("assets:components:", "")
          .replace(".ts", "")
          .replace(".js", "");
        const constructor = name
          .split("-")
          .map((word) => capitalizeFirstLetter(word))
          .join("");

        useStorage().setItem(`registry:${name}`, constructor);
        console.log(`> ${name}, ${constructor}`);
      });
    });
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
