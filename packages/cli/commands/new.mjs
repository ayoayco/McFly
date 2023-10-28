#!/usr/bin/env node

import { execSync as exec } from "node:child_process";
import { consola } from "consola";
import { defineCommand } from "citty";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Creates a new McFly project.",
  },
  args: {
    dir: {
      type: "string",
      description: "project root directory",
      required: false,
    },
    _dir: {
      type: "positional",
      description: "project root directory (prefer using `--dir`)",
      required: false,
    },
  },
  async run({ args }) {
    const directory = args.dir || args._dir;
    const command = directory
      ? `npm create mcfly@latest ${directory}`
      : "npm create mcfly@latest";
    try {
      exec(command, { stdio: "inherit" });
    } catch (e) {
      consola.error(e);
    }
  },
});
