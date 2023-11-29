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
import { SalesChannel } from './SalesChannel'
import { Price } from './Price'

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
  cart_total_initial: Price
  /**
   * Basket value after discounts
   */
  cart_total: Price

  /**
   * Shipping price without discounts
   */
  shipping_price_initial: Price
  /**
   * Shipping price after discounts
   */
  shipping_price: Price

  /**
   * Total order value after discounts
   */
  summary: Price
  /**
   * Amount already paid by client
   */
  summary_paid: Price
  payable: boolean
  documents: OrderDocument[]
  sales_channel: SalesChannel
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
  cart_total_initial: Price
  cart_total: Price
  shipping_price_initial: Price
  shipping_price: Price
  summary: Price
  /**
   * Phisical shipping method only exists if in order is any product without digital shipping type
   */
  shipping_method: Omit<ShippingMethod, 'price'> | null
  /**
   * Digital shipping method only exists if in order is any product with digital shipping type
   */
  digital_shipping_method: Omit<ShippingMethod, 'price'> | null
  created_at: string
  currency: string
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
  /**
   * ID of the current sales channel
   */
  sales_channel_id: UUID
  /**
   * CODE of the current currency
   */
  currency: string
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
