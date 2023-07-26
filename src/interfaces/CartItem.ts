import { ProductList } from './Product'
import { Schema, SchemaType } from './Schema'
import { SchemaOption } from './SchemaOption'
import { UUID } from './UUID'

export interface SavedCartItem {
  type: 'CartItem'
  product: ProductList
  qty: number
  productSchemas: Schema[]
  schemas: CartItemSchema[]
  createdAt: number
}

export type CartItemSchemaValue = string | number | boolean | null | undefined | SchemaOption
export type CartItemRawSchemaValue = string | number | boolean | null | undefined

export interface CartItemSchema {
  id: string
  type: SchemaType
  name: string
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
