import { UUID } from './UUID'
import { CartItemSchemaValue } from './CartItem'
import { CouponShort, SalesShort } from './SalesAndCoupons'

interface CartItemDto {
  cartitem_id: string
  product_id: UUID
  quantity: number
  schemas: Record<UUID, CartItemSchemaValue>
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
  sales: SalesShort[]
}
