#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { execSync as exec } from "child_process";
import { tryCatch } from "../utils/try-catch.mjs";
import path from "node:path";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Prepares the McFly workspace.",
  },
  async run() {
    consola.start("Preparing McFly workspace...");

    const require = createRequire(import.meta.url);
    const globalsPath = path.dirname(require.resolve("@mcflyjs/cli"));

    const steps = [
      () => exec("npx nitropack prepare", { stdio: "inherit" }),
      () =>
        copyFileSync(
          `${globalsPath}/globals/mcfly-imports.d.ts`,
          ".nitro/types/mcfly-imports.d.ts"
        ),
      () =>
        copyFileSync(
          `${globalsPath}/globals/mcfly.d.ts`,
          ".nitro/types/mcfly.d.ts"
        ),
      () => {
        const path = ".nitro/types/tsconfig.json";
        const tsconfig = readFileSync(path);
        const configStr = tsconfig.toString();
        const config = JSON.parse(configStr);
        config.include.push("./mcfly.d.ts");
        writeFileSync(path, JSON.stringify(config));
      },
    ].map((fn) => () => tryCatch(fn));

    let err;
    steps.every((step) => {
      err = step();
      return !err;
    });

    if (err) {
      consola.error(err);
      consola.fail(
        "McFly workspace preparation failed. Please make sure dependencies are installed.\n"
      );
    } else consola.success("Done\n");
  },
});
