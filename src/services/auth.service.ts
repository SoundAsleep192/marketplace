import Elysia, { t } from 'elysia'
import { UserService } from './user.service'

export const authService = new Elysia({ name: 'auth/service' })
  .model({
    signIn: t.Object({
      username: t.String({ minLength: 1 }),
      password: t.String({ minLength: 1 }),
    }),
    changePassword: t.Object({
      oldPassword: t.String(),
      newPassword: t.String(),
    }),
    session: t.Cookie(
      {
        token: t.Number(),
      },
      {
        secrets: process.env.COOKIE_SECRET,
      }
    ),
  })
  .macro(({ onBeforeHandle }) => ({
    authorized(enabled: boolean) {
      if (!enabled) return

      onBeforeHandle(async ({ error, cookie: { token } }) => {
        if (!token.value)
          return error(401, {
            success: false,
            message: 'Unauthorized',
          })

        const user = await UserService.getUserBySessionKey(
          token.value as unknown as number
        )

        if (!user)
          return error(401, {
            success: false,
            message: 'Unauthorized',
          })
      })
    },
  }))
