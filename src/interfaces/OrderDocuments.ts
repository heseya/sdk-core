import { UUID } from './UUID'
import { FileUploadDto } from './CdnMedia'

export enum OrderDocumentType {
  Other = 'other',
  Receipt = 'receipt',
  Invoice = 'invoice',
}

export interface OrderDocument {
  id: UUID
  type: OrderDocumentType
  name: string | null
}

export interface OrderDocumentCreateDto {
  type: OrderDocumentType
  name?: string
  /**
   * For node environment, there can also be a ReadStream object (result of `fs.createReadStream`)
   */
  file: FileUploadDto
}
