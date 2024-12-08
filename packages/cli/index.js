#!/usr/bin/env node
import { defineCommand, runMain } from "citty";

const main = defineCommand({
  meta: {
    name: "mcfly",
    description: "McFly CLI",
  },
  subCommands: {
    new: () => import("./commands/new.mjs").then((r) => r.default),
    serve: () => import("./commands/serve.mjs").then((r) => r.default),
    build: () => import("./commands/build.mjs").then((r) => r.default),
    prepare: () => import("./commands/prepare.mjs").then((r) => r.default),
    generate: () => import("./commands/generate.mjs").then((r) => r.default),
    g: () => import("./commands/generate.mjs").then((r) => r.default),
  },
});

runMain(main);

export const exportedForTest = {
  main,
};
