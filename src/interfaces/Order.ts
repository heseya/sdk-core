import { UUID } from './UUID'
import { Address, AddressDto } from './Address'
import { OrderCartItem } from './CartItem'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { ShippingMethod } from './ShippingMethod'
import { OrderStatus } from './OrderStatus'
import { OrderProduct } from './Product'
import { OrderDiscount } from './SalesAndCoupons'
import { OrderDocument } from './OrderDocuments'
import { OrderPayment } from './Payments'
import { User } from './User'
import { App } from './App'

export interface OrderList extends MetadataFields {
  id: UUID
  code: string
  comment?: string
  created_at: string
  currency: string
  shipping_place?: Address | string
  email: string
  paid: boolean
  billing_address: Address
  invoice_requested: boolean
  /**
   * Phisical shipping method only exists if in order is any product without digital shipping type
   */
  shipping_method: ShippingMethod | null
  /**
   * Digital shipping method only exists if in order is any product with digital shipping type
   */
  digital_shipping_method: ShippingMethod | null
  status: OrderStatus
  /**
   * Basket value without discounts
   */
  cart_total_initial: number
  /**
   * Basket value after discounts
   */
  cart_total: number

  /**
   * Shipping price without discounts
   */
  shipping_price_initial: number
  /**
   * Shipping price after discounts
   */
  shipping_price: number

  /**
   * Total order value after discounts
   */
  summary: number
  /**
   * Amount already paid by client
   */
  summary_paid: number
  payable: boolean
  documents: OrderDocument[]
}

export interface Order extends OrderList {
  discounts: OrderDiscount[]
  payments: OrderPayment[]
  products: OrderProduct[]
  shipping_number: string | null
  buyer: User | App | null
}

export interface OrderSummary extends MetadataFields {
  id: UUID
  code: string
  status: OrderStatus
  paid: boolean
  payable: boolean
  cart_total_initial: number
  cart_total: number
  shipping_price_initial: number
  shipping_price: number
  summary: number
  /**
   * Phisical shipping method only exists if in order is any product without digital shipping type
   */
  shipping_method: Omit<ShippingMethod, 'price'> | null
  /**
   * Digital shipping method only exists if in order is any product with digital shipping type
   */
  digital_shipping_method: Omit<ShippingMethod, 'price'> | null
  created_at: string
}

/**
 * ------------------------------------------------------------
 * ? DTO
 * ------------------------------------------------------------
 */

export interface OrderCreateDto extends CreateMetadataFields {
  email: string
  comment: string
  /**
   * If in order is any product without digital shipping type, this field is required
   */
  shipping_method_id?: UUID
  /**
   * If in order is any product with digital shipping type, this field is required
   */
  digital_shipping_method_id?: UUID
  shipping_place?: AddressDto | UUID | string
  billing_address: AddressDto
  invoice_requested: boolean
  items: OrderCartItem[]
  coupons: string[]
  sales_ids: UUID[]
}

export interface OrderUpdateDto {
  email?: string
  comment?: string
  shipping_number?: string
  shipping_method_id?: UUID
  digital_shipping_method_id?: UUID
  shipping_place?: AddressDto | UUID | string
  billing_address?: AddressDto
  invoice_requested?: boolean
}
