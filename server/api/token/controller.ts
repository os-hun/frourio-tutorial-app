import { defineController } from './$relay'
import { validateUser } from '$/service/user'

export default defineController((fastify) => ({
  post: ({ body }) => {
    if (validateUser(body.id, body.pass)) {
      const token = fastify.jwt.sign({ id: body.id })

      return {
        status: 201,
        body: { token },
        headers: {
          'Set-Cookie': `smart_token=${token}; domain=localhost; path=/; httpOnly=true;`
        }
      }
    } else {
      return { status: 401 }
    }
  }
}))
