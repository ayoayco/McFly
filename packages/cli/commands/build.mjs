#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";
import { execSync as exec } from "node:child_process";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Builds the McFly project for production.",
  },

  async run() {
    consola.start("Building project...");
    try {
      exec(`npx nitropack build`, { stdio: "inherit" });
    } catch (err) {
      consola.error(err);
    }
  },
});
