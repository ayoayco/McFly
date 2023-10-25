#!/usr/bin/env node

import { execSync as exec } from "node:child_process";
import { consola } from "consola";
import { defineCommand } from "citty";
import { commonArgs } from "../common.mjs";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Generate types for the project",
  },
  args: {
    ...commonArgs,
  },
  async run({ args }) {
    const [directory] = args._;
    consola.info(directory);
    // try {
    //   exec("npm create mcfly@latest", { stdio: "inherit" });
    // } catch (e) {
    //   consola.error(e);
    // }
  },
});
