import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UUID } from './UUID'

export interface WarehouseItem extends MetadataFields {
  id: UUID
  name: string
  sku: string
  quantity: number
  shipping_time: null | number
  shipping_date: null | string
  /**
   * Means the shipping time in days of items in unlimited quantity
   */
  unlimited_stock_shipping_time: null | number

  /**
   * Means that the shipment will be processed after the given date.
   * The item has unlimited stock up to and including the date specified.
   * Once that date has passed, the product becomes unavailable.
   */
  unlimited_stock_shipping_date: null | string

  /**
   * Summary of the item availability for a different time frames
   */
  availability: {
    shipping_time: number | null
    shipping_date: string | null
    quantity: number
  }[]
}

export interface WarehouseItemCreateDto extends CreateMetadataFields {
  name: string
  sku: string
  /**
   * Means the shipping time in days of items in unlimited quantity
   */
  unlimited_stock_shipping_time: null | number

  /**
   * Means that the shipment will be processed after the given date.
   * The item has unlimited stock up to and including the date specified.
   * Once that date has passed, the product becomes unavailable.
   */
  unlimited_stock_shipping_date: null | string
}

export type WarehouseItemUpdateDto = Omit<
  Partial<WarehouseItemCreateDto>,
  keyof CreateMetadataFields
>

/**
 * ? Deposits
 */

export interface WarehouseDeposit {
  id: UUID
  sku: string
  quantity: number
  shipping_time: null | number
  shipping_date: null | string
  item_id: UUID
  order: { id: UUID; code: string } | null
  created_at: string
}

export type WarehouseDepositDto =
  | {
      quantity: number
      shipping_time?: number
    }
  | {
      quantity: number
      shipping_date?: string
    }

/**
 * ? Product items
 */
export interface ProductWarehouseItem {
  /** Product ID */
  id: UUID
  name: string
  required_quantity: number
}

export type ProductWarehouseItemDto = Omit<ProductWarehouseItem, 'name'>
