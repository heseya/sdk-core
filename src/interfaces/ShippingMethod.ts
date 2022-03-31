import { MetadataFields } from './Metadata'
import { PaymentMethod } from './PaymentMethod'
import { UUID } from './UUID'

export interface ShippingCountry {
  code: string
  name: string
}

export interface ShippingMethodPriceRange {
  id: UUID
  start: number
  prices: { id: UUID; value: number }[]
}

export interface ShippingMethod extends MetadataFields {
  id: UUID
  black_list: boolean
  countries: ShippingCountry[]
  name: string
  payment_methods: PaymentMethod[]
  price_ranges: ShippingMethodPriceRange[]
  public: boolean
  shipping_time_max: number
  shipping_time_min: number
}

export interface ShippingMethodCreateDto {
  name: string
  public: boolean
  black_list: boolean
  /** List of the Country.code's */
  countries: string[]
  payment_methods: UUID[]
  price_ranges: { start: number; value: number }[]
  shipping_time_max: number
  shipping_time_min: number
}
export type ShippingMethodUpdateDto = ShippingMethodCreateDto
