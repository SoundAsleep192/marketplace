import Elysia from 'elysia'
import { authService } from '../services/auth.service'
import { UserService } from '../services/user.service'

export const authorizedUserPlugin = new Elysia()
  .use(authService)
  .guard({
    cookie: 'session',
    authorized: true,
  })
  .resolve(async ({ cookie: { token } }) => ({
    authorizedUser: await UserService.getUserBySessionKey(token.value),
  }))
  .as('plugin')
