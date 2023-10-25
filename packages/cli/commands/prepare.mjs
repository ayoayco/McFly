#!/usr/bin/env node

import { consola } from "consola";
import { defineCommand } from "citty";
import { commonArgs } from "../common.mjs";
import { existsSync, writeFileSync, appendFileSync } from "node:fs";

export default defineCommand({
  meta: {
    name: "prepare",
    description: "Prepares the McFly workspace.",
  },
  args: {
    ...commonArgs,
  },
  async run({ args }) {
    const typeDefinition = `\n/// <reference path="./mcfly-imports.d.ts" />`;
    const globalDefinition = `import {WebComponent as W} from "web-component-base/WebComponent.mjs"; declare global {const WebComponent: typeof W;}export {WebComponent};`;

    if (existsSync(".nitro/types/nitro.d.ts")) {
      try {
        writeFileSync(".nitro/types/mcfly-imports.d.ts", globalDefinition);
      } catch (e) {
        consola.error(e);
      }
      try {
        appendFileSync(".nitro/types/nitro.d.ts", typeDefinition);
      } catch (e) {
        consola.error(e);
      }
    } else {
      consola.log(
        "Preparation Failed. Please run:\n> npx nitropack prepare && npx mcfly prepare"
      );
    }
  },
});
