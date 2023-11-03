#!/usr/bin/env node

import { consola } from "consola";
import { colorize } from "consola/utils";
import { defineCommand } from "citty";
import { execSync as exec } from "node:child_process";
import { createRequire } from "node:module";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Runs the dev server.",
  },
  async run() {
    try {
      const _require = createRequire(import.meta.url);
      const mcflyPkg = await _require("@mcflyjs/core/package.json");
      const mcflyPkgVersion = `McFly ${colorize("bold", mcflyPkg.version)}`;
      const nitroPkg = await _require("nitropack/package.json");
      const nitroPkgVersion = `Nitro ${nitroPkg.version}`;
      consola.log(
        `${colorize("blue", mcflyPkgVersion)} ${colorize(
          "dim",
          nitroPkgVersion
        )}`
      );
    } catch (e) {
      consola.error(e);
    }

    try {
      exec(`npx nitropack dev`, { stdio: "inherit" });
    } catch (e) {
      consola.error(e);
    }
  },
});
