import { sql } from '../models/db'
import type { User } from '../models/user.model'

export abstract class PurchaseRepository {
  static async executePurchaseTx(
    userId: number,
    itemId: number
  ): Promise<number> {
    const newBalance = await sql.begin(async (sql) => {
      await sql`
        UPDATE items 
          SET quantity = quantity - 1 
            WHERE item_id = ${itemId}
      `

      const [{ balance }]: [Pick<User, 'balance'>] = await sql`
        UPDATE users 
          SET balance = balance - (
            SELECT min_price FROM items WHERE item_id = ${itemId}
          ) 
            WHERE user_id = ${userId}
              RETURNING balance
      `

      await sql`
        INSERT INTO purchases(user_id, item_id)
          VALUES ${sql([userId, itemId])}
      `

      return balance
    })

    return newBalance
  }
}
