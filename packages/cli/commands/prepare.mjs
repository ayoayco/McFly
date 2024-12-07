#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";
import { execSync } from "node:child_process";

function prepare() {
    consola.start("Preparing McFly workspace...");

    let err;

    try {
      execSync("npx nitropack prepare", { stdio: "inherit" });
    } catch (e) {
      consola.error(e);
      err = e;
    }

    if (err) {
      consola.fail(
        "McFly workspace preparation failed. Please make sure dependencies are installed.\n"
      );
    } else consola.success("Done\n");
}

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Prepares the McFly workspace.",
  },
  run() {
    prepare();
  },
});


export const exportedForTest = {
  prepare
}