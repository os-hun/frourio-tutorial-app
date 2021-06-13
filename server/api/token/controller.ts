import { defineController } from './$relay'

export default defineController(() => ({
  post: () => {
    return { status: 201, body: { message: 'Logged in.' } }
  }
}))
