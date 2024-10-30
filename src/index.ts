import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { userController } from './controllers/user.controller'
import { itemController } from './controllers/item.controller'

new Elysia()
  .use(swagger())
  .use(userController)
  .use(itemController)
  .listen(3000)
