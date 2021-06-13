import type { UserInfo } from '$/types'
import type { ReadStream } from 'fs'

export type Methods = {
  get: {
    resBody: UserInfo
  }

  post: {
    reqFormat: FormData
    reqBody: { icon: File | ReadStream }
    resBody: UserInfo
  }
}
