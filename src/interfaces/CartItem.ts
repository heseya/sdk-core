import { Product } from './Product'
import { SchemaOption, SchemaType } from './Schema'
import { UUID } from './UUID'

export interface SavedCartItem {
  type: 'CartItem'
  product: Product
  qty: number
  schemas: CartItemSchema[]
  createdAt: number
}

export type CartItemSchemaValue = string | number | boolean | null | SchemaOption

export interface CartItemSchema {
  id: string
  type: SchemaType
  name?: string
  price: number
  optionPrice?: number
  dependencies: string[]
  value: CartItemSchemaValue
}

export interface OrderCartItem {
  product_id: UUID
  quantity: number
  schemas: Record<UUID, CartItemSchemaValue>
}
