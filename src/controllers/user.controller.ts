import { Elysia, t } from 'elysia'
import { UserService } from '../services/user.service'

export const userController = new Elysia({ prefix: '/user' })
  .post(
    '/sign-in',
    async ({ error, body: { username, password }, cookie: { token } }) => {
      const user = await UserService.getUserByUsername(username)

      if (!user || !(await Bun.password.verify(password, user.password))) {
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
  .post('/change-password', 'смена пароля пользователем')
