#!/usr/bin/env node

import { consola } from 'consola'
import { defineCommand } from 'citty'

function generate() {
  consola.box('Generate a McFly building block (In-progress)')
}

export default defineCommand({
  meta: {
    name: 'generate',
    description: 'Generates building blocks for a McFly app.',
  },
  run() {
    generate()
  },
})

export const exportedForTest = {
  generate,
}
