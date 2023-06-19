import { CdnMedia, CdnMediaAttachmentType, CdnMediaAttachmentVisiblity } from './CdnMedia'
import { UUID } from './UUID'

export interface ProductAttachment {
  id: UUID
  name: string
  /**
   * Max 1000 characters
   */
  description: string | null
  visibility: CdnMediaAttachmentVisiblity
  type: CdnMediaAttachmentType
  media: CdnMedia
}

export interface ProductAttachmentCreateDto {
  name: string
  /**
   * Max 1000 characters
   */
  description?: string
  visibility: CdnMediaAttachmentVisiblity
  type: CdnMediaAttachmentType
  media_id: UUID
}

export type ProductAttachmentUpdateDto = Omit<ProductAttachmentCreateDto, 'media_id'>
