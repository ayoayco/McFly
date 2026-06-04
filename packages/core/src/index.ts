#!/usr/bin/env node
import { defineCommand, runMain, type ArgsDef, type CommandDef } from 'citty'

export type Logger = {
  log: Function
  error: Function
}

export type ServerConfig = {
  rootDir: string
  apiDir: string
  port: number
  logger: Logger
}

const main: CommandDef<ArgsDef> = defineCommand({
  meta: {
    name: 'mcfly',
    description: 'McFly CLI',
  },
  subCommands: {
    build: () => import('./commands/build.js').then((r) => r.default),
    generate: () => import('./commands/generate.js').then((r) => r.default),
    new: () => import('./commands/new.js').then((r) => r.default),
    prepare: () => import('./commands/prepare.js').then((r) => r.default),
    serve: () => import('./commands/serve.js').then((r) => r.default),
    g: () => import('./commands/generate.js').then((r) => r.default),
  },
})

runMain(main)

export const exportedForTest = {
  main,
} as const
