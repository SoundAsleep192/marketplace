import shift from 'postgres-shift'
import postgres from 'postgres'
import { fileURLToPath } from 'bun'

export const sql = postgres({
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
})

shift({
  sql,
  path: fileURLToPath(new URL('../migrations', import.meta.url)),
  before: ({ migration_id, name }) => {
    console.log('Migrating', migration_id, name)
  },
})
  .then(() => console.log('All good'))
  .catch((err) => {
    console.error('Failed', err)
    process.exit(1)
  })
