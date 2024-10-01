/* eslint-disable camelcase */
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { StrNumber } from './Number'
import { PriceDto } from './Price'
import { Product } from './Product'
import { ProductSet } from './ProductSet'
import { DiscountConditionGroup, DiscountConditionGroupDto } from './SaleCondition'
import { SeoMetadata, SeoMetadataDto } from './Seo'
import { ShippingMethod } from './ShippingMethod'
import { UUID } from './UUID'
import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  Translations,
  TranslationsCreateDto,
} from './languages'
import { PartiallyOptional } from './utils'

export enum DiscountTargetType {
  OrderValue = 'order-value',
  Products = 'products', // (Includes also product-sets)
  ShippingPrice = 'shipping-price',
  CheapestProduct = 'cheapest-product',
}

// ? ---------------------------------------------------------------------------------------------------------------

interface DiscountByPercentage {
  percentage: StrNumber
  amounts: null
}

export interface DiscountAmount {
  currency: string
  is_net: boolean
  value: StrNumber
}

interface DiscountByAmount {
  percentage: null
  amounts: DiscountAmount[]
}

type DiscountValue = DiscountByAmount | DiscountByPercentage

// -- dto

interface DiscountByPercentageDto {
  percentage: StrNumber
  amounts: undefined
}

interface DiscountByAmountDto {
  percentage: undefined
  amounts: PriceDto[]
}

// export type DiscountValueDto = DiscountByAmountDto | DiscountByPercentageDto

// one of this is required
export type DiscountValueDto = {
  percentage: StrNumber | undefined
  amounts: PriceDto[] | undefined
}

// ? ---------------------------------------------------------------------------------------------------------------

export interface SaleTranslatable {
  name: string
  description: string | null
  description_html: string | null
}

export type SaleListed = DiscountValue &
  SaleTranslatable &
  Translations<SaleTranslatable> &
  PublishedTranslations &
  MetadataFields & {
    id: UUID
    slug: string | null
    active: boolean
    priority: number
    uses: number
    target_type: DiscountTargetType
    target_is_allow_list: boolean
  }
/**
 * @deprecated use SaleListed instead
 */
export type SaleList = SaleListed

export type Sale = SaleListed & {
  condition_groups: DiscountConditionGroup[]
  target_products: Product[]
  target_sets: ProductSet[]
  target_shipping_methods: ShippingMethod[]
  seo: SeoMetadata
}

export type CouponListed = SaleListed & {
  code: string
}
/**
 * @deprecated use CouponListed instead
 */
export type CouponList = CouponListed

export type Coupon = Sale & {
  code: string
}

// ? ---------------------------------------------------------------------------------------------------------------

export type SaleCreateDto = DiscountValueDto &
  PublishedTranslationsCreateDto &
  TranslationsCreateDto<SaleTranslatable> &
  CreateMetadataFields & {
    slug?: string
    active?: boolean
    priority: number
    condition_groups?: DiscountConditionGroupDto[]
    target_type: DiscountTargetType
    target_products?: UUID[]
    target_sets?: UUID[]
    target_shipping_methods?: UUID[]
    target_is_allow_list: boolean
    seo?: SeoMetadataDto
  }

export type SaleUpdateDto = Omit<
  PartiallyOptional<SaleCreateDto, 'published' | 'translations'>,
  keyof CreateMetadataFields
>

export type CouponCreateDto = SaleCreateDto & {
  code: string
}

export type CouponUpdateDto = Omit<
  PartiallyOptional<CouponCreateDto, 'published' | 'translations'>,
  keyof CreateMetadataFields
>

// ? ---------------------------------------------------------------------------------------------------------------

export type ProductSale = DiscountValue &
  SaleTranslatable &
  Translations<SaleTranslatable> &
  MetadataFields & {
    id: UUID
    slug: string | null
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
   */
  value: StrNumber
  currency: string
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
