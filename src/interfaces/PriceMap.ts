import { UUID } from './UUID'

export interface PriceMapListed {
  id: UUID
  name: string
  description: string
  /**
   * ISO code of the currency
   */
  currency: string
  is_net: boolean
}

export type PriceMap = PriceMapListed

export interface PriceMapCreateDto {
  id?: UUID
  name: string
  description?: string | null
  /**
   * ISO code of the currency
   */
  currency: string
  is_net: boolean
}

export type PriceMapUpdateDto = Partial<Omit<PriceMapCreateDto, 'id'>>

/**
 * * ---------------------------------------------------------------------
 */

/**
 * List of all products and schemas prices for a given map
 */

export interface PriceMapProductSchemaPrice {
  schema_id: UUID
  schema_option_id: UUID
  schema_name: string
  schema_option_name: string
  schema_option_price: string
}

export interface PriceMapPrice {
  id: UUID
  product_id: UUID
  product_name: string
  product_price: string
  schema_options: PriceMapProductSchemaPrice[]
}

export interface PriceMapPriceUpdateDto {
  products: {
    id: UUID
    value: string
  }[]
  schema_options: {
    id: UUID
    value: string
  }[]
}

/**
 * * ---------------------------------------------------------------------
 */

/**
 * List of prices of the given product for each map
 */
export interface PriceMapProductPrice {
  id: UUID
  price_map_id: UUID
  price_map_name: string
  is_net: boolean
  currency: string
  price: string
}

export type PriceMapProductPriceUpdateDto = {
  price_map_id: UUID
  price: string
}[]

/**
 * List of prices of the given schema for each map
 */
export interface PriceMapSchemaPrice {
  id: UUID
  price_map_id: UUID
  price_map_name: string
  currency: string
  is_net: boolean
  options: {
    id: UUID
    price: string
  }[]
}

export type PriceMapSchemaPriceUpdateDto = {
  id: UUID
  price_map_id: UUID
  options: {
    id: UUID
    price: string
  }[]
}[]
