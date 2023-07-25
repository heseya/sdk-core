import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UUID } from './UUID'
import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

interface OrderStatusTranslatable {
  name: string
  description: string
}

interface OrderStatusBase {
  /**
   * Color of the status
   */
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

export interface OrderStatus
  extends OrderStatusTranslatable,
    OrderStatusBase,
    Translations<OrderStatusTranslatable>,
    PublishedTranslations,
    MetadataFields {
  id: UUID
}

export interface OrderStatusCreateDto
  extends OrderStatusBase,
    CreateMetadataFields,
    PublishedTranslationsCreateDto,
    TranslationsCreateDto<OrderStatusTranslatable> {}

export interface OrderStatusUpdateDto
  extends Partial<OrderStatusBase>,
    PublishedTranslationsUpdateDto,
    TranslationsUpdateDto<Partial<OrderStatusTranslatable>> {}
