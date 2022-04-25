/* eslint-disable camelcase */
import { Product } from './Product'
import { ProductSet } from './ProductSet'
import { DiscountConditionGroup, DiscountConditionGroupDto } from './SaleCondition'
import { ShippingMethod } from './ShippingMethod'
import { UUID } from './UUID'

export enum DiscountType {
  Percentage = 'percentage',
  Amount = 'amount',
}

export enum DiscountTargetType {
  OrderValue = 'order-value',
  Products = 'products', // (Includes also product-sets)
  ShippingPrice = 'shipping-price',
  CheapestProduct = 'cheapest-product',
}

// ? ---------------------------------------------------------------------------------------------------------------

export interface Sale {
  id: UUID
  name: string
  description: string | null
  value: number
  type: DiscountType
  priority: number
  uses: number
  condition_groups: DiscountConditionGroup[]
  target_type: DiscountTargetType
  target_products: Product[]
  target_sets: ProductSet[]
  target_shipping_methods: ShippingMethod[]
  target_is_allow_list: boolean
}

export interface Coupon extends Sale {
  code: string
}

// ? ---------------------------------------------------------------------------------------------------------------

export interface SaleCreateDto {
  name: string
  description: string | null
  value: number
  type: DiscountType
  priority: number
  condition_groups: DiscountConditionGroupDto[]
  target_type: DiscountTargetType
  target_products: UUID[]
  target_sets: UUID[]
  target_shipping_methods: UUID[]
  target_is_allow_list: boolean
}

export type SaleUpdateDto = SaleCreateDto

export interface CouponCreateDto extends SaleCreateDto {
  code: string
}

export type CouponUpdateDto = CouponCreateDto

// ? ---------------------------------------------------------------------------------------------------------------

export interface SaleShort {
  id: UUID
  name: string
  /**
   * Amount by which it reduced the value of the entire contract
   */
  value: number
}

export interface CouponShort extends SaleShort {
  code: string
}

// ? ---------------------------------------------------------------------------------------------------------------

export interface OrderDiscount {
  id: UUID
  discount_id: UUID
  name: string
  code: string | null
  type: DiscountType
  target_type: DiscountTargetType
  /**
   * Discount value e.g. 10 for %
   */
  value: number
  /**
   * The amount that the discount has been calculated
   */
  applied_discount: number
}
