import { defineHooks } from './$relay'

export type AdditionalRequest = {
  user: {
    id: string
  }
}

export default defineHooks((fastify) => ({
  onRequest: (request, reply, done) => {
    const { smart_token } = request.cookies
    const decode_result = fastify.jwt.decode<{ id: string }>(smart_token)

    if (smart_token && decode_result) {
      request.user = { id: decode_result.id }
      done()
    } else {
      reply.code(401).send('Unauthorized')
    }
  }
}))
