import Elysia from 'elysia'
import { ItemService } from '../services/item.service'
import { authService } from '../services/auth.service'

export const itemController = new Elysia({ prefix: '/item' })
  .use(authService)
  .get(
    '/',
    async () => {
      const items = await ItemService.getAllItems()
      return {
        success: true,
        items,
      }
    },
    { authorized: true }
  )
