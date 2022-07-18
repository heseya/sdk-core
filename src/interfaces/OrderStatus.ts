import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UUID } from './UUID'

export interface OrderStatus extends MetadataFields {
  id: UUID
  name: string
  description: string
  color: string

  /**
   * Orders with status that has canceled status will be canceled, and all items will be returned to stock.
   */
  cancel: boolean

  /**
   * Order with status that is hidden, are by default not shown in the order list.
   */
  hidden: boolean

  /**
   * Order with status with no_notification, will not send an email notification to the customer.
   */
  no_notifications: boolean
}

export type OrderStatusCreateDto = Omit<OrderStatus, 'id' | keyof MetadataFields> &
  CreateMetadataFields

export type OrderStatusUpdateDto = Omit<OrderStatusCreateDto, keyof CreateMetadataFields>
