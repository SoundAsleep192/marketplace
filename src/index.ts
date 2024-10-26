import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'

new Elysia()
  .use(swagger())
  .get('/', 'Hello Elysia')
  .get('/user/:id', ({ params: { id } }) => id)
  .get('/hello', 'Do you miss me?')
  .post('/form', ({ body }) => body)
  .listen(3000)
