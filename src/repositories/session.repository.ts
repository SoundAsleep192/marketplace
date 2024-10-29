import { sql } from '../models/db'
import type { User } from '../models/user.model'

export abstract class SessionRepository {
  static async addSession(key: number, userId: number): Promise<void> {
    await sql`INSERT INTO sessions(session_key, user_id) VALUES ${sql([
      key,
      userId,
    ])}`
  }

  static async getSessionUser(key: number): Promise<User | null> {
    const [sessionUser]: [User?] = await sql`
      SELECT * FROM users 
        WHERE 
          user_id = (
            SELECT user_id FROM sessions 
              WHERE session_key = ${key}
          )
      `
    return sessionUser ?? null
  }
}
