import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { userController } from './controllers/user.controller'
import { itemController } from './controllers/item.controller'

new Elysia()
  .use(swagger())
  .use(userController)
  // проверка аутентификации
  // В отдачу предметов необходимо добавить кеширование через redis
  .use(itemController)
  .post(
    '/buy',
    `Нужно реализовать покупку предмета из таблицы items, у пользователя должен быть баланс
    В ответе должен быть обновленный баланс пользователя`
  )
  .listen(3000)
