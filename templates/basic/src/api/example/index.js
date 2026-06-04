export default async (fastify) => {
  fastify.get('/', async function (request, reply) {
    console.log({ request, reply })
    return 'This is an example'
  })
}
