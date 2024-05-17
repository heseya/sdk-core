import { UUID } from './UUID'
import { ProductListed } from './Product'

export interface WishlistProduct {
  id: UUID
  product: ProductListed
  created_at: string
}

export interface WishlistProductCreateDto {
  product_id: UUID
}
