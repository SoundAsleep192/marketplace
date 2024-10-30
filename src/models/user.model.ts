import { t } from 'elysia'

export const userModel = t.Object({
  user_id: t.Number(),
  username: t.String(),
  password: t.String(),
  balance: t.Number(),
})

export type User = typeof userModel.static
