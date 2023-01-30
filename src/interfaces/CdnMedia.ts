import { CreateMetadataFields, MetadataFields } from './Metadata'

/**
 * For node environment, there can also or a Buffer or a ReadStream object (result of `fs.createReadStream`), but it cannot be typed this way in browsers.
 */
export type FileUploadDto = File // | ReadStream | Buffer

export enum CdnMediaType {
  Photo = 'photo',
  Video = 'video',
  Document = 'document',
  Other = 'other',
}

export interface CdnMedia extends MetadataFields {
  id: string
  type: CdnMediaType
  url: string
  alt: string | null
  slug: string | null
}

export interface CdnMediaCreateDto extends CreateMetadataFields {
  /**
   * For node environment, there can also be a Buffer or a ReadStream object (result of `fs.createReadStream`)
   */
  file: FileUploadDto
  alt?: string
  slug?: string
  metadata?: Record<string, string>
  metadata_private?: Record<string, string>
}

export interface CdnMediaUpdateDto {
  alt?: string
  slug?: string
}
