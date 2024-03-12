import { UUID } from './UUID'
import { OrderCartItem } from './CartItem'
import { CouponShort, SaleShort } from './SalesAndCoupons'
import { StrNumber } from './Number'

export interface CartItemDto extends OrderCartItem {
  cartitem_id: string
}

export interface CartDto {
  items: CartItemDto[]
  /** CouponResource.code */
  coupons: string[]
  /**
   * Shipping method if in cart is any product without digital shipping type
   */
  shipping_method_id?: UUID
  /**
   * Shipping method if in cart is any product with digital shipping type
   */
  digital_shipping_method_id?: UUID
  /**
   * ID of the current sales channel
   */
  sales_channel_id: UUID
  /**
   * CODE of the current currency
   */
  currency: string
}

interface ProcessedCartItem {
  cartitem_id: string
  /** Singular prices */
  price: StrNumber
  price_discounted: StrNumber
  quantity: number
}

export interface ProcessedCart {
  currency: string
  /**
   * Total price of the cart items (before discounts)
   */
  cart_total_initial: StrNumber

  /**
   * Total price of the cart items
   */
  cart_total: StrNumber

  /**
   * Shipping price for the given cart and selected method (before diccounts)
   * If there is phisical and digital shipping method, the price is sum of both
   */
  shipping_price_initial: StrNumber

  /**
   * Shipping price for the given cart and selected method
   * If there is phisical and digital shipping method, the price is sum of both
   */
  shipping_price: StrNumber

  /**
   * Number of working days representing the time of preparing the shipment - not include delivery time
   */
  shipping_time: number | null

  /**
   * Expected date of the shipping - not include delivery time
   */
  shipping_date: string | null

  /**
   * Total price of the whole cart - including shipping price and discounts
   */
  summary: StrNumber

  items: ProcessedCartItem[]
  coupons: CouponShort[]
  sales: SaleShort[]
}
