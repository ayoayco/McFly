#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";
import { commonArgs } from "../common.mjs";
import { execSync as exec } from "child_process";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Runs the dev server.",
  },
  args: {
    ...commonArgs,
  },
  async run({ args }) {
    try {
      exec(`npx nitropack dev`, { stdio: "inherit" });
    } catch (e) {
      consola.error(e);
    }
  },
});
