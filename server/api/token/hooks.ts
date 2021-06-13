import { defineHooks } from './$relay'
import { validateUser } from '$/service/user'
import type { LoginBody } from '$/validators'

export default defineHooks((fastify) => ({
  preValidation: (req, reply, done) => {
    const user = req.body as LoginBody
    if (validateUser(user.id, user.pass)) {
      const token = fastify.jwt.sign({ id: user.id })
      reply.setCookie('smart_api_token', token, {
        domain: 'localhost',
        path: '/',
        httpOnly: true
      })
    } else {
      reply.status(401).send({ message: 'Login failed.' })
    }
    done()
  }
}))
