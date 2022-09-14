import { Address } from './Address'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { PaymentMethod } from './PaymentMethods'
import { UUID } from './UUID'

export enum ShippingType {
  None = 'none',
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
  start: number
  prices: { id: UUID; value: number; model_id: UUID }[]
}

export interface ShippingMethodPriceRangeDto {
  start: number
  value: number
}

export interface ShippingMethod extends MetadataFields {
  id: UUID
  name: string
  shipping_type: ShippingType
  payment_methods: PaymentMethod[]
  public: boolean
  block_list: boolean
  shipping_time_max: number
  shipping_time_min: number
  countries: ShippingCountry[]
  price_ranges: ShippingMethodPriceRange[]
  price: number | null
  integration_key?: string
  deletable: boolean
  shipping_points: Address[]
}

export interface ShippingMethodCreateDto extends CreateMetadataFields {
  name: string
  shipping_type: ShippingType
  payment_methods: UUID[]
  public: boolean
  block_list: boolean
  shipping_time_max: number
  shipping_time_min: number
  /** List of the Country.code's */
  countries: ShippingCountry['code'][]
  price_ranges: { start: number; value: number }[]
  app_id?: UUID
  shipping_points?: Address[]
}

export type ShippingMethodUpdateDto = Omit<ShippingMethodCreateDto, keyof CreateMetadataFields>
