import postgres from 'postgres'

export const sql = postgres({
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
})

await sql`
  DROP TABLE IF EXISTS migrations CASCADE;
  DROP TABLE IF EXISTS items CASCADE;
  DROP TABLE IF EXISTS purchases CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS sessions CASCADE;
`
