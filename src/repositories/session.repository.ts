import { sql } from '../models/db'
import type { User } from '../models/user.model'

export abstract class SessionRepository {
  static async addSession(key: number, userId: string): Promise<void> {
    await sql`insert into sessions(key, user_id) values ${sql([key, userId])}`
  }

  static async getSessionUser(key: string): Promise<User | null> {
    const [sessionUser]: [User?] = await sql`
      SELECT * FROM users 
        WHERE 
          user_id = (
            SELECT user_id FROM sessions 
              WHERE key = ${sql(key)}
          )
      `
    return sessionUser ?? null
  }
}
