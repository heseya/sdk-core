import { MetadataFields } from './Metadata'
import { UUID } from './UUID'

export interface OrderStatus extends MetadataFields {
  id: UUID
  name: string
  description: string
  color: string
  cancel: boolean
}

export interface OrderStatusDto {
  name: string
  description: string
  color: string
  cancel: boolean
}
