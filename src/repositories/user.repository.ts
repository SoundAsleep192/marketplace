import { sql } from '../models/db'
import type { User } from '../models/user.model'

export abstract class UserRepository {
  static async getUserByUsername(username: string): Promise<User | null> {
    const [user]: [User?] = await sql`
      SELECT * FROM users WHERE username = ${username};
    `
    return user ?? null
  }

  static async getUserByUserId(userId: number): Promise<User | null> {
    const [user]: [User?] = await sql`
      SELECT * FROM users WHERE user_id = ${userId};
    `
    return user ?? null
  }

  static async updatePassword(
    userId: number,
    newPassword: string
  ): Promise<void> {
    await sql`
      UPDATE users SET password = ${newPassword} WHERE user_id = ${userId};
    `
  }

  static async withdraw(userId: number, amount: number): Promise<number> {
    const [newBalance]: [{ balance: number }?] = await sql`
      UPDATE users 
        SET balance = balance - ${amount} 
          WHERE user_id = ${userId} 
            RETURNING balance;
    `

    return newBalance?.balance ?? NaN
  }
}
