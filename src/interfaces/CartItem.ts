import { ProductListed } from './Product'
import { Schema } from './Schema'
import { UUID } from './UUID'

export interface SavedCartItem {
  type: 'CartItem'
  product: ProductListed
  qty: number
  productSchemas: Schema[]
  schemas: CartItemSchema[]
  currency: string
  createdAt: number
}

export type CartItemRawSchemaValue = string | undefined

export interface CartItemSchema {
  id: string
  name: string
  optionPrice: {
    net: number
    gross: number
  }
  dependencies: string[]
  value: UUID | null
}
