import { UUID } from './UUID'
import { Address, AddressDto } from './Address'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { OrderShippingMethod } from './ShippingMethod'
import { OrderStatus } from './OrderStatus'
import { OrderProduct } from './Product'
import { OrderDiscount } from './SalesAndCoupons'
import { OrderDocument } from './OrderDocuments'
import { OrderPayment } from './Payments'
import { User } from './User'
import { App } from './App'
import { OrderSalesChannel } from './SalesChannel'
import { PaymentMethodType } from './PaymentMethods'
import { OrderPrice } from './Price'

export interface OrderListed extends MetadataFields {
  id: UUID
  code: string
  comment?: string
  created_at: string
  currency: string
  shipping_place?: Address | string
  email: string
  paid: boolean
  /** de, fr-CA, de-DE-1996 */
  language: string
  billing_address: Address
  invoice_requested: boolean
  /**
   * Phisical shipping method only exists if in order is any product without digital shipping type
   */
  shipping_method: OrderShippingMethod | null
  /**
   * Digital shipping method only exists if in order is any product with digital shipping type
   */
  digital_shipping_method: OrderShippingMethod | null
  status: OrderStatus
  /**
   * Basket value without discounts
   */
  cart_total_initial: OrderPrice
  /**
   * Basket value after discounts
   */
  cart_total: OrderPrice

  /**
   * Shipping price without discounts
   */
  shipping_price_initial: OrderPrice
  /**
   * Shipping price after discounts
   */
  shipping_price: OrderPrice

  /**
   * Total order value after discounts
   */
  summary: OrderPrice
  /**
   * Amount already paid by client
   */
  summary_paid: OrderPrice
  payable: boolean
  documents: OrderDocument[]
  sales_channel: OrderSalesChannel
  payment_method_type: PaymentMethodType
}
/**
 * @deprecated use OrderListed instead
 */
export type OrderList = OrderListed

export interface Order extends OrderListed {
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
  payment_method_type: PaymentMethodType
  cart_total_initial: OrderPrice
  cart_total: OrderPrice
  shipping_price_initial: OrderPrice
  shipping_price: OrderPrice
  summary: OrderPrice
  /**
   * Phisical shipping method only exists if in order is any product without digital shipping type
   */
  shipping_method: OrderShippingMethod | null
  /**
   * Digital shipping method only exists if in order is any product with digital shipping type
   */
  digital_shipping_method: OrderShippingMethod | null
  created_at: string
  currency: string
}

/**
 * ------------------------------------------------------------
 * ? DTO
 * ------------------------------------------------------------
 */

export interface OrderCreateDtoItem {
  product_id: UUID
  quantity: number
  schemas: Record<UUID, UUID>
}

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
  items: OrderCreateDtoItem[]
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
  /**
   * ID of the initial payment method. It forces the client to pay with the method of the same type
   */
  payment_method_id: UUID
  /**
   * If the user belongs to an organisation (the order is placed for the organisation), then this field is required.
   */
  organization_id?: UUID
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
