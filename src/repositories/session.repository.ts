import { sql } from '../models/db'
import type { User } from '../models/user.model'

export abstract class SessionRepository {
  static async addSession(key: number, userId: number): Promise<void> {
    console.log({ key, userId })
    await sql`insert into sessions(session_key, user_id) values ${sql([
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
