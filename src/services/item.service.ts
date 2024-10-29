import type { Item } from '../models/item.model'
import { ItemRepository } from '../repositories/item.repository'

export abstract class ItemService {
  static async getAllItems(): Promise<Item[]> {
    return ItemRepository.getAll()
  }
}
