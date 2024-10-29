import { t } from 'elysia'

export const purchaseModel = t.Object({
  purchase_id: t.Number(),
  user_id: t.Number(),
  item_id: t.Number(),
  purchased_at: t.String(),
})

export type Purchase = typeof purchaseModel.static
