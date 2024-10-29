import { t } from 'elysia'

export const itemModel = t.Object({
  item_id: t.String(),
  name: t.String(),
  min_price: t.Number(),
  min_price_tradable: t.Nullable(t.Number()),
  quantity: t.Integer(),
})

export type Item = typeof itemModel.static
