import { existsSync, promises as fsp } from "node:fs";

export default function setUpSsr() {
  return async () => {
    if (!existsSync("./routes")) {
      await fsp.mkdir("./routes");
    }

    if (!existsSync("./routes/[...index].ts"))
      try {
        fsp.copyFile(
          "./packages/assets/mcfly-ssr.ts",
          "./routes/[...index].ts"
        );
        console.log("SSR set up successfully!");
      } catch (err) {
        if (err) {
          console.log("Error Found:", err);
        } else {
          // Get the current filenames
          // after the function
          console.log("SSR set up successfully!");
        }
      }
  };
}
