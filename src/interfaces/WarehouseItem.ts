import { UUID } from './UUID'

export interface WarehouseItem {
  id: UUID
  name: string
  sku: string
  quantity: number
}

export type WarehouseItemDto = Omit<WarehouseItem, 'id'>
