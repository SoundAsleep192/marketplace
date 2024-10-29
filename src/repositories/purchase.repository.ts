import { sql } from '../models/db'

export abstract class PurchaseRepository {
  static async createPurchase(userId: number, itemId: number): Promise<void> {
    await sql`
      INSERT INTO purchases(user_id, item_id)
        VALUES ${sql([userId, itemId])}
    `
  }
}
