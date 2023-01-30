import { CartItem } from '../models/CartItem'
import { SavedCartItem } from '../interfaces/CartItem'

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

export const restoreCart = (savedCart: SavedCartItem[], cartItemLifeDuration = ONE_WEEK) => {
  return savedCart
    .filter(({ createdAt }) => Date.now() - createdAt < cartItemLifeDuration)
    .map(
      ({ product, qty, schemas, productSchemas, createdAt }) =>
        new CartItem(product, qty, productSchemas, schemas, [], createdAt),
    )
}
