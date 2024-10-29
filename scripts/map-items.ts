import { appendFile } from 'node:fs/promises'

const path = 'items.json'
const file = Bun.file(path)

interface ItemRaw {
  market_hash_name: string
  currency: string
  suggested_price: number
  item_page: string
  market_page: string
  min_price: number
  max_price: number
  mean_price: number
  median_price: number
  quantity: number
  created_at: number
  updated_at: number
}

interface ItemMapped {
  name: string
  min_price: number
  min_price_tradable: number
  quantity: number
}

export const items: ItemRaw[] = await file.json()

const mappedItems: ItemMapped[] = items.slice(0, 1000).map((rawFile) => ({
  name: rawFile.market_hash_name,
  min_price: rawFile.suggested_price,
  min_price_tradable: rawFile.min_price,
  quantity: rawFile.quantity,
}))

await appendFile(
  'items-mapped.json',
  JSON.stringify(mappedItems, undefined, '  ')
)
