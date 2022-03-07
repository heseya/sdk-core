import { UUID } from './UUID'

export interface WarehouseItem {
  id: UUID
  name: string
  sku: string
  quantity: number
}

export type WarehouseItemDto = Omit<WarehouseItem, 'id'>

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
