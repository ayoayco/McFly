#!/usr/bin/env node
const { defineCommand, runMain } = require("citty");
const pkg = require("./package.json");

const main = defineCommand({
  meta: {
    name: "mcfly",
    description: "McFly CLI",
    version: pkg.version,
  },
  subCommands: {
    prepare: () => import("./commands/prepare.js").then((r) => r.default),
    generate: () => import("./commands/generate.js").then((r) => r.default),
    new: () => import("./commands/new.mjs").then((r) => r.default),
  },
});

runMain(main);
