import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UUID } from './UUID'

export interface WarehouseItem extends MetadataFields {
  id: UUID
  name: string
  sku: string
  quantity: number
}

export interface WarehouseItemCreateDto extends CreateMetadataFields {
  name: string
  sku: string
}

export interface WarehouseItemUpdateDto {
  name?: string
  sku?: string
}

/**
 * ? Deposits
 */

export interface WarehouseDeposit {
  id: UUID
  quantity: number
  item_id: UUID
  order_product_id: UUID
}

export interface WarehouseDepositDto {
  quantity: number
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
