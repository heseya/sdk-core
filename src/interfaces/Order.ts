import { UUID } from './UUID'
import { DiscountCode } from './DiscountCode'
import { CartItem } from '../models/CartItem'
import { Address } from './Address'
import { OrderCartItem } from './CartItem'
import { MetadataFields } from './Metadata'
import { ShippingMethod } from './ShippingMethod'
import { OrderStatus } from './OrderStatus'
import { OrderDocument } from './OrderDocuments'

export interface OrderPayment {
  id: UUID
  amount: number
  continue_url: string
  external_id: UUID
  method: string
  paid: boolean
  redirect_url: string
  date: string
}

export interface OrderList extends MetadataFields {
  id: UUID
  code: string
  comment?: string
  created_at: string
  currency: string
  delivery_address: Address
  email: string
  paid: boolean
  shipping_method: ShippingMethod
  shipping_price: number
  status: OrderStatus
  summary: number
  summary_paid: number
  documents: OrderDocument[]
}
export interface Order extends OrderList {
  discounts: DiscountCode[]
  invoice_address: Address
  payable: boolean
  payments: OrderPayment[]
  products: CartItem[]
  shipping_number?: string
}

export interface OrderSummary {
  id: UUID
  code: string
  status: OrderStatus
  paid: boolean
  payable: boolean
  summary: number
  shipping_method_id: string
  created_at: string
}

/**
 * ------------------------------------------------------------
 * ? DTO
 * ------------------------------------------------------------
 */

export interface OrderDto {
  email: string
  comment: string
  shipping_method_id: string
  items: OrderCartItem[]
  delivery_address: Address
  invoice_address: Address
  discounts: string[]
}

export interface OrderUpdateDto {
  email?: string
  comment?: string
  delivery_address?: Address
  invoice_address?: Address
}
