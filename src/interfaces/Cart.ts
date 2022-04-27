import { UUID } from './UUID'
import { OrderCartItem } from './CartItem'
import { CouponShort, SaleShort } from './SalesAndCoupons'

export interface CartItemDto extends OrderCartItem {
  cartitem_id: string
}

export interface CartDto {
  items: CartItemDto[]
  coupons: string[] // CouponResource.code
  shipping_method_id?: UUID
}

interface ProcessedCartItem {
  cartitem_id: string
  // Ceny jednostkowe
  price: number
  price_discounted: number
}

export interface ProcessedCart {
  cart_total_initial: number
  cart_total: number
  shipping_price_initial: number
  shipping_price: number
  summary: number
  items: ProcessedCartItem[]
  coupons: CouponShort[]
  sales: SaleShort[]
}
