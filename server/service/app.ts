import path from 'path'
import Fastify, { FastifyServerFactory } from 'fastify'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import fastifyStatic from 'fastify-static'
import fastifyJwt from 'fastify-jwt'
import cookie, { FastifyCookieOptions } from 'fastify-cookie'
import {
  API_JWT_SECRET,
  API_BASE_PATH,
  API_UPLOAD_DIR,
  API_COOKIE_SECRET
} from '$/service/envValues'
import server from '$/$server'

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory })
  app.register(helmet)
  app.register(cors, {
    origin: 'http://localhost:8000',
    credentials: true
  })
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'static'),
    prefix: '/static/'
  })
  if (API_UPLOAD_DIR) {
    app.after(() => {
      app.register(fastifyStatic, {
        root: path.resolve(__dirname, API_UPLOAD_DIR),
        prefix: '/upload/',
        decorateReply: false
      })
    })
  }
  app.register(cookie, {
    secret: API_COOKIE_SECRET
  } as FastifyCookieOptions)
  app.register(fastifyJwt, {
    secret: API_JWT_SECRET,
    cookie: {
      cookieName: 'smart_api_token',
      signed: false
    }
  })
  server(app, { basePath: API_BASE_PATH })
  return app
}
