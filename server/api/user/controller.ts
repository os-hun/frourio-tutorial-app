import { defineController } from './$relay'
import { getUserInfoById, changeIcon } from '$/service/user'
import { parseCookie } from '$/utils/parseCookie'

export default defineController(() => ({
  get: ({ user, headers }) => {
    if (headers.cookie) {
      const { smart_token } = parseCookie(headers.cookie)
      console.log('smart-token : ' + smart_token)
    }
    return { status: 200, body: getUserInfoById(user.id) }
  },
  post: async ({ user, body }) => ({
    status: 201,
    body: await changeIcon(user.id, body.icon)
  })
}))
