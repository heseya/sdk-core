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
  availibility: {
    delivery_time: number | string
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
  order_product_id: UUID
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
  id: UUID
  name: string
  required_quantity: number
}

export type ProductWarehouseItemDto = Omit<ProductWarehouseItem, 'name'>
