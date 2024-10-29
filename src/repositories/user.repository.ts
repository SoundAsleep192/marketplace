import { sql } from '../models/db'
import type { User } from '../models/user.model'

export abstract class UserRepository {
  static async getUserByUsername(username: string): Promise<User | null> {
    const [user]: [User?] = await sql`
    select * from users where username = ${sql(username)} 
    `
    return user ?? null
  }
}
