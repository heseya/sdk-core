import { UUID } from './UUID'
import { ProductSetListed } from './ProductSet'

export interface FavouriteProductSet {
  id: UUID
  product_set: ProductSetListed
  created_at: string
}

export interface FavouriteProductSetCreateDto {
  product_set_id: UUID
}
