import { ProductListed } from './Product'
import { Schema } from './Schema'
import { SchemaOption } from './SchemaOption'
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

export type CartItemSchemaValue = string | number | boolean | null | undefined | SchemaOption
export type CartItemRawSchemaValue = string | number | boolean | null | undefined

export interface CartItemSchema {
  id: string
  name: string
  optionPrice: number
  dependencies: string[]
  value: CartItemSchemaValue
}

export interface OrderCartItem {
  product_id: UUID
  quantity: number
  schemas: Record<UUID, CartItemSchemaValue>
}
