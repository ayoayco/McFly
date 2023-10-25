#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";
import { commonArgs } from "../common.mjs";
import { execSync as exec } from "child_process";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Builds the McFly project for production.",
  },
  args: {
    ...commonArgs,
  },
  async run({ args }) {
    try {
      exec(`npx nitropack build`, { stdio: "inherit" });
    } catch (e) {
      consola.error(e);
    }
  },
});
