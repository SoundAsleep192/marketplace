import type { User } from '../models/user.model'
import { SessionRepository } from '../repositories/session.repository'
import { UserRepository } from '../repositories/user.repository'

export abstract class UserService {
  static async getUserByUsername(username: string): Promise<User | null> {
    return UserRepository.getUserByUsername(username)
  }

  static async getUserBySessionKey(key: number): Promise<User | null> {
    return SessionRepository.getSessionUser(key)
  }

  static async createUserSession(
    user: User,
    sessionKey: number
  ): Promise<void> {
    return SessionRepository.addSession(sessionKey, user.user_id)
  }

  static async updatePassword(user: User, newPassword: string): Promise<void> {
    const newPasswordHash = await Bun.password.hash(newPassword)
    return UserRepository.updatePassword(user.user_id, newPasswordHash)
  }

  static async verifyPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return Bun.password.verify(password, hash)
  }
}
