#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";
import { commonArgs } from "../common.mjs";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Generates building blocks for a McFly app.",
  },
  args: {
    ...commonArgs,
  },
  async run({ args }) {
    consola.box("Generate a McFly building block");
  },
});
