import { defineConfig } from '@mcflyjs/config'
import fastify from '@mcflyjs/fastify'

export default defineConfig({
  server: fastify(),
})
