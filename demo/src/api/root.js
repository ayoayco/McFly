export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    console.log({ opts, request, reply })
    return { root: true }
  })
}
