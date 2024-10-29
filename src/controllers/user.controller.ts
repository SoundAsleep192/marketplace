import { Elysia, t } from 'elysia'
import { UserService } from '../services/user.service'
import { authService } from '../services/auth.service'

export const userController = new Elysia({ prefix: '/user' })
  .use(authService)
  .post(
    '/sign-in',
    async ({ error, body: { username, password }, cookie: { token } }) => {
      const user = await UserService.getUserByUsername(username)

      if (
        !user ||
        !(await UserService.verifyPassword(password, user.password))
      ) {
        return error(400, {
          success: false,
          message: 'Invalid username or password',
        })
      }

      const sessionKey = crypto.getRandomValues(new Uint32Array(1))[0]

      await UserService.createUserSession(user, sessionKey)

      token.value = sessionKey

      return {
        success: true,
        message: `Signed in as ${username}`,
      }
    },
    {
      body: 'signIn',
      cookie: 'session',
    }
  )
  .post(
    '/change-password',
    async ({
      error,
      body: { oldPassword, newPassword },
      cookie: { token },
    }) => {
      if (oldPassword === newPassword) {
        return error(400, {
          success: false,
          message: 'Can not use the same password',
        })
      }

      const user = await UserService.getUserBySessionKey(token.value)

      if (
        !user ||
        !(await UserService.verifyPassword(oldPassword, user.password))
      ) {
        return error(401)
      }

      await UserService.updatePassword(user, newPassword)

      return {
        success: true,
        message: `Password has been updated`,
      }
    },
    {
      body: 'changePassword',
      cookie: 'session',
    }
  )
