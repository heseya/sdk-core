/* eslint-disable camelcase */
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { StrNumber } from './Number'
import { Price, PriceDto } from './Price'
import { Product } from './Product'
import { ProductSet } from './ProductSet'
import { DiscountConditionGroup, DiscountConditionGroupDto } from './SaleCondition'
import { SeoMetadata, SeoMetadataDto } from './Seo'
import { ShippingMethod } from './ShippingMethod'
import { UUID } from './UUID'

export enum DiscountTargetType {
  OrderValue = 'order-value',
  Products = 'products', // (Includes also product-sets)
  ShippingPrice = 'shipping-price',
  CheapestProduct = 'cheapest-product',
}

// ? ---------------------------------------------------------------------------------------------------------------

interface DiscountAmount {
  percentage: StrNumber
  amounts: null
}

interface DiscountAmountDto {
  percentage: StrNumber
  amounts?: undefined
}

type DiscountValue = DiscountAmount | DiscountPercentage

interface DiscountPercentage {
  percentage: null
  amounts: Price[]
}

interface DiscountPercentageDto {
  percentage?: undefined
  amounts: PriceDto[]
}

type DiscountValueDto = DiscountAmountDto | DiscountPercentageDto

// ? ---------------------------------------------------------------------------------------------------------------

export type Sale = MetadataFields &
  DiscountValue & {
    id: UUID
    name: string
    slug: string | null
    description: string | null
    description_html: string | null
    active: boolean
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

export type Coupon = Sale & {
  code: string
}

// ? ---------------------------------------------------------------------------------------------------------------

export type SaleCreateDto = CreateMetadataFields &
  DiscountValueDto & {
    name: string
    slug?: string
    description?: string | null
    description_html?: string | null
    active?: boolean
    priority: number
    condition_groups: DiscountConditionGroupDto[]
    target_type: DiscountTargetType
    target_products: UUID[]
    target_sets: UUID[]
    target_shipping_methods: UUID[]
    target_is_allow_list: boolean
    seo?: SeoMetadataDto
  }

export type SaleUpdateDto = Omit<SaleCreateDto, keyof CreateMetadataFields>

export type CouponCreateDto = SaleCreateDto & {
  code: string
}

export type CouponUpdateDto = Omit<CouponCreateDto, keyof CreateMetadataFields>

// ? ---------------------------------------------------------------------------------------------------------------

export type ProductSale = DiscountValue & {
  id: UUID
  name: string
  slug: string
  description: string
  description_html: string
  priority: number
  target_type: DiscountTargetType
  target_is_allow_list: boolean
  active: boolean
}

// ? ---------------------------------------------------------------------------------------------------------------

export type SaleShort = {
  id: UUID
  name: string
  /**
   * Amount by which it reduced the value of the entire contract
   * TODO: probably string
   */
  value: number
}

export type CouponShort = SaleShort & {
  code: string
}

// ? ---------------------------------------------------------------------------------------------------------------

export type OrderDiscount = {
  id: UUID
  discount_id: UUID
  name: string
  code: string | null
  target_type: DiscountTargetType
  percentage: StrNumber | null
  amount: StrNumber | null
  /**
   * The amount that the discount has been calculated
   */
  applied_discount: StrNumber
}
