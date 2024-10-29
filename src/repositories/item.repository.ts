import { sql } from '../models/db'
import type { Item } from '../models/item.model'

export abstract class ItemRepository {
  static async getAll(): Promise<Item[]> {
    return sql`SELECT * FROM items;`
  }
}
