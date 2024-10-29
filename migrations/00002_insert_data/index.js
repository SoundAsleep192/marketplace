export default async function (sql) {
  await insertData('data/items.json', 'items', sql)
  await insertData('data/users.json', 'users', sql)
}

async function insertData(pathToDataFile, tableName, sql) {
  const file = Bun.file(pathToDataFile)

  const items = await file.json()

  await sql`
    INSERT INTO ${sql(tableName)} ${sql(items)}
  `
}
