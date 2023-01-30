import { CreateMetadataFields, MetadataFields } from './Metadata'
import { PaymentMethod } from './PaymentMethods'
import { UUID } from './UUID'

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
  block_list: boolean
  countries: ShippingCountry[]
  name: string
  price: number | null
  payment_methods: PaymentMethod[]
  price_ranges: ShippingMethodPriceRange[]
  public: boolean
  shipping_time_max: number
  shipping_time_min: number
}

export interface ShippingMethodCreateDto extends CreateMetadataFields {
  name: string
  public: boolean
  block_list: boolean
  /** List of the Country.code's */
  countries: string[]
  payment_methods: UUID[]
  price_ranges: { start: number; value: number }[]
  shipping_time_max: number
  shipping_time_min: number
}

export type ShippingMethodUpdateDto = Omit<ShippingMethodCreateDto, keyof CreateMetadataFields>
