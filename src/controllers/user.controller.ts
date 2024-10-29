import { Elysia, t } from 'elysia'
import { UserService } from '../services/user.service'

export const userController = new Elysia({ prefix: '/user' })
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
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
      cookie: t.Cookie(
        {
          token: t.Number(),
        },
        {
          secrets: process.env.COOKIE_SECRET,
        }
      ),
    }
  )
  .get('/sign-out', ({ cookie: { token } }) => {
    token.remove()

    return {
      success: true,
      message: 'Signed out',
    }
  })
  // логин, пароль, новый пароль
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
      body: t.Object({
        oldPassword: t.String(),
        newPassword: t.String(),
      }),
      cookie: t.Cookie(
        {
          token: t.Number(),
        },
        {
          secrets: process.env.COOKIE_SECRET,
        }
      ),
    }
  )
