import { UUID } from './UUID'
import { CdnMediaAttachmentType, FileUploadDto } from './CdnMedia'

/**
 * @deprecated Use `CdnMediaAttachmentType` instead
 */
export type OrderDocumentType = CdnMediaAttachmentType
export interface OrderDocument {
  id: UUID
  type: CdnMediaAttachmentType
  name: string | null
}

export interface OrderDocumentCreateDto {
  type: CdnMediaAttachmentType
  name?: string
  /**
   * For node environment, there can also be a Buffer or a ReadStream object (result of `fs.createReadStream`)
   */
  file: FileUploadDto
}
