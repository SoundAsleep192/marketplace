import { sql } from '../models/db'
import type { Item } from '../models/item.model'

export abstract class ItemRepository {
  static async getAll(): Promise<Item[]> {
    return sql`SELECT * FROM items ORDER BY item_id`
  }

  static async getItemByItemid(itemId: number): Promise<Item | null> {
    const [item]: [Item?] =
      await sql`SELECT * FROM items WHERE item_id = ${itemId}`

    return item ?? null
  }
}
