import type { Item } from '../models/item.model'
import { ItemRepository } from '../repositories/item.repository'
import { PurchaseRepository } from '../repositories/purchase.repository'
import { UserRepository } from '../repositories/user.repository'

export abstract class ItemService {
  static async getAllItems(): Promise<Item[]> {
    return ItemRepository.getAll()
  }

  static async purchase(userId: number, itemId: number): Promise<number> {
    const user = await UserRepository.getUserByUserId(userId)

    if (!user) {
      throw new Error('user not found')
    }

    const item = await ItemRepository.getItemByItemid(itemId)

    if (!item) {
      throw new Error('item not found')
    }

    if (user.balance < item.min_price) {
      throw new Error('insufficient funds')
    }

    const balanceLeft = await UserRepository.withdraw(userId, item.min_price)

    if (Number.isNaN(balanceLeft)) {
      throw new Error('internal server error')
    }

    await PurchaseRepository.createPurchase(userId, itemId)

    return balanceLeft
  }
}
