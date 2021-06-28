import { config } from '../config'
import { CartItem, SavedCartItem } from '../models/CartItem'

export const restoreCart = (savedCart: SavedCartItem[]) => {
  return savedCart
    .filter(({ createdAt }) => Date.now() - createdAt < config.cartItemLifeDuration)
    .map(({ product, qty, schemas, createdAt }) => new CartItem(product, qty, schemas, createdAt))
}
