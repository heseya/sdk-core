import { CreateMetadataFields, MetadataFields } from './Metadata'
import { ProductBase } from './Product'
import { SchemaBase } from './Schema'
import { UUID } from './UUID'

export interface WarehouseItemList extends MetadataFields {
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
   * `quantity == null` means, that product has infinity quantity in that time frame
   */
  availability: Array<
    | {
        shipping_time: number
        shipping_date: null
        quantity: number | null
        /**
         * Means, that deposit was created using unlimited stock, they are not influencing current total stock quantity
         */
        from_unlimited: boolean
      }
    | {
        shipping_time: null
        shipping_date: string
        quantity: number | null
        /**
         * Means, that deposit was created using unlimited stock, they are not influencing current total stock quantity
         */
        from_unlimited: boolean
      }
    | {
        shipping_time: null
        shipping_date: null
        quantity: number | null
        /**
         * Means, that deposit was created using unlimited stock, they are not influencing current total stock quantity
         */
        from_unlimited: boolean
      }
  >
}

export interface WarehouseItemProduct extends ProductBase {
  quantity: number
}

export type WarehouseItemSchema = SchemaBase

export interface WarehouseItem extends WarehouseItemList {
  products: WarehouseItemProduct[]
  schemas: WarehouseItemSchema[]
}

export interface WarehouseItemCreateDto extends CreateMetadataFields {
  id?: UUID
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
  keyof CreateMetadataFields | 'id'
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
  /**
   * Means, that deposit was created using unlimited stock, they are not influencing current total stock quantity
   */
  from_unlimited: boolean
}

export type WarehouseDepositDto =
  | {
      quantity: number
      shipping_time: number
      from_unlimited?: boolean
    }
  | {
      quantity: number
      shipping_date: string
      from_unlimited?: boolean
    }

/**
 * ? Product items
 */
export interface ProductWarehouseItem {
  /** Product ID */
  id: UUID
  name: string
  sku: string
  required_quantity: number
}

export type ProductWarehouseItemDto = Omit<ProductWarehouseItem, 'name'>
