import { CartItem, SavedCartItem } from '../models/CartItem'

// TODO: from config
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

export const restoreCart = (savedCart: SavedCartItem[]) => {
  return savedCart
    .filter(({ createdAt }) => Date.now() - createdAt < ONE_WEEK)
    .map(({ product, qty, schemas, createdAt }) => new CartItem(product, qty, schemas, createdAt))
}
