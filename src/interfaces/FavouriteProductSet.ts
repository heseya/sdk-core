import { UUID } from './UUID'
import { ProductSetList } from './ProductSet'

export interface FavouriteProductSet {
  id: UUID
  product_set: ProductSetList
  created_at: string
}

export interface FavouriteProductSetCreateDto {
  product_set_id: UUID
}
