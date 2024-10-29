import { Elysia, t } from 'elysia'
import { ItemService } from '../services/item.service'
import { authService } from '../services/auth.service'
import { authorizedUserPlugin } from '../plugins/authorized-user.plugin'

export const itemController = new Elysia({ prefix: '/item' })
  .model({
    purchase: t.Object({
      itemId: t.Number(),
    }),
  })
  .use(authService)
  .use(authorizedUserPlugin)
  .get('/', async () => {
    const items = await ItemService.getAllItems()
    return {
      success: true,
      items,
    }
  })
  .post(
    '/purchase',
    async ({ authorizedUser, body }) => {
      const newBalance = await ItemService.purchase(
        authorizedUser.user_id,
        body.itemId
      )

      return {
        success: true,
        newBalance,
      }
    },
    { body: 'purchase' }
  )
