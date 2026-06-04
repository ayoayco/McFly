export default async (fastify) => {
  fastify.get('/', async function (request, reply) {
    return 'This is the API Index'
  })
}
