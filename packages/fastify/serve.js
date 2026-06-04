import Fastify from 'fastify'
import AutoLoad from '@fastify/autoload'
import path from 'node:path'

export default ({ rootDir, apiDir, logger, port }) => {
  const server = Fastify()
  const portNumber = port ?? 3000

  server.register(AutoLoad, {
    dir: path.join(rootDir, apiDir),
    options: {
      prefix: apiDir,
    },
  })

  server
    .listen({ port: portNumber })
    .then(() => {
      logger.log(`API now serving at http://localhost:${portNumber}${apiDir}`)
    })
    .catch((err) => logger.error(err))
}
