import cookie from 'cookie'

export const parseCookie = (cookies: string) => cookie.parse(cookies)
