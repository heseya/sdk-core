import { config } from '../config'
import { CartItem } from '../models/CartItem'
import { SavedCartItem } from '../interfaces/CartItem'

export const restoreCart = (savedCart: SavedCartItem[]) => {
  return savedCart
    .filter(({ createdAt }) => Date.now() - createdAt < config.cartItemLifeDuration)
    .map(
      ({ product, qty, schemas, productSchemas, createdAt }) =>
        new CartItem(product, qty, productSchemas, schemas, createdAt),
    )
}
