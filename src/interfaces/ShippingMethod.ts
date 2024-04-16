import { Address } from './Address'
import { CdnMedia } from './CdnMedia'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { PaymentMethod } from './PaymentMethods'
import { Price } from './Price'
import { UUID } from './UUID'

export enum ShippingType {
  Digital = 'digital',
  Address = 'address',
  Point = 'point',
  PointExternal = 'point-external',
}

export interface ShippingCountry {
  code: string
  name: string
}

export interface ShippingMethodPriceRange {
  id: UUID
  start: Price
  value: Price
}

export interface ShippingMethodPriceRangeDto {
  start: string
  value: string
  currency: string
}

export interface ShippingMethod extends MetadataFields {
  id: UUID
  name: string
  shipping_type: ShippingType
  payment_methods: PaymentMethod[]
  public: boolean
  shipping_time_max: number
  shipping_time_min: number
  logo: CdnMedia | null
  /**
   * Indicates, if the countries list is a block list or an allow list
   */
  is_block_list_countries: boolean
  countries: ShippingCountry[]
  /**
   * Indicates, if the products and productSets lists are a block list or an allow list
   */
  is_block_list_products: boolean
  /**
   * Products that can or cannot be sent via this shipping method
   */
  product_ids: UUID[]
  /**
   * ProductsSets that products can or cannot be sent via this shipping method
   */
  product_set_ids: UUID[]
  price_ranges: ShippingMethodPriceRange[]
  prices: Price[]
  integration_key?: string
  shipping_points: Address[]
  deletable: boolean
  /**
   * If true, then this shipping method cannot have any `payment_methods`, because payment will be made on delivery
   */
  payment_on_delivery: boolean
}

export interface ShippingMethodCreateDto extends CreateMetadataFields {
  name: string
  shipping_type: ShippingType
  payment_methods: UUID[]
  public: boolean
  shipping_time_max: number
  shipping_time_min: number
  /**
   * Media ID of the logo
   */
  logo_id?: UUID | null
  /**
   * Indicates, if the products and productSets lists are a block list or an allow list
   */
  is_block_list_products: boolean
  /**
   * Products that can or cannot be sent via this shipping method
   */
  product_ids: UUID[]
  /**
   * ProductsSets that products can or cannot be sent via this shipping method
   */
  product_set_ids: UUID[]
  /**
   * Indicates, if the countries list is a block list or an allow list
   */
  is_block_list_countries: boolean
  /** List of the Country.code's */
  countries: ShippingCountry['code'][]
  /**
   * This field must include ranges for each of existing currencies
   */
  price_ranges: ShippingMethodPriceRangeDto[]
  app_id?: UUID
  shipping_points?: Address[]
  /**
   * If true, then this shipping method cannot have any `payment_methods`, because payment will be made on delivery
   */
  payment_on_delivery: boolean
}

export type ShippingMethodUpdateDto = Omit<ShippingMethodCreateDto, keyof CreateMetadataFields>
