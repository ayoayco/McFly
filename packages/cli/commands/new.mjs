#!/usr/bin/env node

import { execSync } from "node:child_process";
import { consola } from "consola";
import { defineCommand } from "citty";

function createNew(args) {
    const directory = args.dir || args._dir;
    const command = directory
      ? `npm create mcfly@latest ${directory}`
      : "npm create mcfly@latest";
    try {
      execSync(command, { stdio: "inherit" });
    } catch (e) {
      consola.error(e);
    }
}

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
    createNew(args)
  },
});

export const exportedForTest = {
  createNew
}