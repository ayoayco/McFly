#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";
import { execSync as exec } from "child_process";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Runs the dev server.",
  },
  async run() {
    try {
      exec(`npx nitropack dev`, { stdio: "inherit" });
    } catch (e) {
      consola.error(e);
    }
  },
});
