import { t } from 'elysia'

export const userModel = t.Object({
  id: t.Number(),
  username: t.String(),
  password: t.String(),
  balance: t.Integer(),
})

export type User = typeof userModel.static
