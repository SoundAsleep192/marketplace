import { sql } from '../models/db'
import type { User } from '../models/user.model'

export abstract class UserRepository {
  static async getUserByUsername(username: string): Promise<User | null> {
    const [user]: [User?] = await sql`
      SELECT * FROM users WHERE username = ${username};
    `
    return user ?? null
  }
}
