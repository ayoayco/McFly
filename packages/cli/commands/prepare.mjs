#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";
import { execSync as exec } from "node:child_process";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Prepares the McFly workspace.",
  },
  async run() {
    consola.start("Preparing McFly workspace...");

    let err;

    try {
      exec("npx nitropack prepare", { stdio: "inherit" });
    } catch (e) {
      consola.error(e);
      err = e;
    }

    if (err) {
      consola.fail(
        "McFly workspace preparation failed. Please make sure dependencies are installed.\n"
      );
    } else consola.success("Done\n");
  },
});
