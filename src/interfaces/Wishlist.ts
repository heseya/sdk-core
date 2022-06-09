import { UUID } from './UUID'
import { ProductList } from './Product'

export interface WishlistProduct {
  id: UUID
  product: ProductList
  created_at: string
}

export interface WishlistProductCreateDto {
  product_id: UUID
}
