#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Generates building blocks for a McFly app.",
  },
  async run() {
    consola.box("Generate a McFly building block (In-progress)");
  },
});
