import type { User } from '../models/user.model'
import { SessionRepository } from '../repositories/session.repository'
import { UserRepository } from '../repositories/user.repository'

export abstract class UserService {
  static async getUserByUsername(username: string): Promise<User | null> {
    return UserRepository.getUserByUsername(username)
  }

  static async createUserSession(
    user: User,
    sessionKey: number
  ): Promise<void> {
    return SessionRepository.addSession(sessionKey, user.id)
  }
}
