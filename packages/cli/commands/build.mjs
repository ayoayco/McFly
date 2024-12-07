#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";
import { execSync } from "node:child_process";

function build() {
    consola.start("Building project...");
    try {
      execSync(`npx nitropack build`, { stdio: "inherit" });
    } catch (err) {
      consola.error(err);
    }
}

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Builds the McFly project for production.",
  },

  async run() {
    build()
  },
});

export const exportedForTest = {
  build,
}