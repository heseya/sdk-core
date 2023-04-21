/* eslint-disable camelcase */
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { Product } from './Product'
import { ProductSet } from './ProductSet'
import { DiscountConditionGroup, DiscountConditionGroupDto } from './SaleCondition'
import { SeoMetadata } from './Seo'
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

export interface Sale extends MetadataFields {
  id: UUID
  name: string
  slug: string
  description: string | null
  description_html: string
  active: boolean
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
  seo: SeoMetadata
}

export interface Coupon extends Sale {
  code: string
}

// ? ---------------------------------------------------------------------------------------------------------------

export interface SaleCreateDto extends CreateMetadataFields {
  name: string
  description: string | null
  value: number
  active: boolean
  type: DiscountType
  priority: number
  condition_groups: DiscountConditionGroupDto[]
  target_type: DiscountTargetType
  target_products: UUID[]
  target_sets: UUID[]
  target_shipping_methods: UUID[]
  target_is_allow_list: boolean
}

export type SaleUpdateDto = Omit<SaleCreateDto, keyof CreateMetadataFields>

export interface CouponCreateDto extends SaleCreateDto {
  code: string
}

export type CouponUpdateDto = Omit<CouponCreateDto, keyof CreateMetadataFields>

// ? ---------------------------------------------------------------------------------------------------------------

export interface ProductSale {
  id: string
  name: string
  slug: string
  description: string
  description_html: string
  type: DiscountType
  value: number
  priority: number
  target_type: DiscountTargetType
  target_is_allow_list: boolean
  active: boolean
}

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
