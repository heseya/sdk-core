import { UUID } from './UUID'
import { CouponShort, SaleShort } from './SalesAndCoupons'
import { OrderPrice } from './Price'

export interface CartItemDto {
  cartitem_id: string
  product_id: UUID
  quantity: number
  schemas: Record<UUID, UUID | null>
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

  /**
   * Price of the cart item (in selected variant) (before any discounts)
   */
  price: OrderPrice

  /**
   * Price of the cart item (in selected variant) (including "product" discounts; without "cart" discounts)
   */
  price_discounted: OrderPrice
  quantity: number
}

export interface ProcessedCart {
  currency: string
  /**
   * Total price of the cart items (in selected variants) (before any discounts)
   */
  cart_total_initial: OrderPrice

  /**
   * Total price of the cart items (in selected variants) (including "product" discounts and "cart" discounts)
   */
  cart_total: OrderPrice

  /**
   * Shipping price for the given cart and selected method (before discounts)
   * If there is physical and digital shipping method, the price is sum of both
   */
  shipping_price_initial: OrderPrice

  /**
   * Shipping price for the given cart and selected method (including discounts)
   * If there is physical and digital shipping method, the price is sum of both
   */
  shipping_price: OrderPrice

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
  summary: OrderPrice

  items: ProcessedCartItem[]
  coupons: CouponShort[]
  sales: SaleShort[]
}
