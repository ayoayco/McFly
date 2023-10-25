#!/usr/bin/env node

const { existsSync, writeFileSync, appendFileSync } = require("node:fs");

const typeDefinition = `\n/// <reference path="./mcfly-imports.d.ts" />`;
const globalDefinition = `import {WebComponent as W} from "web-component-base/WebComponent.mjs"; declare global {const WebComponent: typeof W;}export {WebComponent};`;

if (existsSync(".nitro/types/nitro.d.ts")) {
  console.log("has directory");
  try {
    writeFileSync(".nitro/types/mcfly-imports.d.ts", globalDefinition);
  } catch (e) {
    console.error(e);
  }
  try {
    appendFileSync(".nitro/types/nitro.d.ts", typeDefinition);
  } catch (e) {
    console.error(e);
  }
} else {
  console.log(
    "Preparation Failed. Please run:\n> npx nitropack prepare && npx mcfly prepare"
  );
}
