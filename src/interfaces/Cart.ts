import { UUID } from './UUID'
import { OrderCartItem } from './CartItem'
import { CouponShort, SaleShort } from './SalesAndCoupons'

export interface CartItemDto extends OrderCartItem {
  cartitem_id: string
}

export interface CartDto {
  items: CartItemDto[]
  /** CouponResource.code */
  coupons: string[]
  shipping_method_id?: UUID
}

interface ProcessedCartItem {
  cartitem_id: string
  /** Singular prices */
  price: number
  price_discounted: number
  quantity: number
}

export interface ProcessedCart {
  /**
   * Total price of the cart items (before discounts)
   */
  cart_total_initial: number

  /**
   * Total price of the cart items
   */
  cart_total: number

  /**
   * Shipping price for the given cart and selected method (before diccounts)
   */
  shipping_price_initial: number

  /**
   * Shipping price for the given cart and selected method
   */
  shipping_price: number

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
  summary: number

  items: ProcessedCartItem[]
  coupons: CouponShort[]
  sales: SaleShort[]
}
