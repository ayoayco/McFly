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
    new: () => import("./commands/new.mjs").then((r) => r.default),
    serve: () => import("./commands/serve.mjs").then((r) => r.default),
    build: () => import("./commands/build.mjs").then((r) => r.default),
    prepare: () => import("./commands/prepare.mjs").then((r) => r.default),
    generate: () => import("./commands/generate.mjs").then((r) => r.default),
  },
});

runMain(main);
