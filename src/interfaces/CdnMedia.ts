import { MetadataFields } from './Metadata'
import { UUID } from './UUID'

/**
 * For node environment, there can also or a Buffer or a ReadStream object (result of `fs.createReadStream`), but it cannot be typed this way in browsers.
 */
export type FileUploadDto = File // | ReadStream | Buffer

export enum CdnMediaSource {
  Silverbox = 'silverbox',
  External = 'external',
}

export enum CdnMediaType {
  Photo = 'photo',
  Video = 'video',
  Document = 'document',
  Other = 'other',
}

export enum CdnMediaAttachmentType {
  Other = 'other',
  Receipt = 'receipt',
  Invoice = 'invoice',
}

export enum CdnMediaAttachmentVisiblity {
  Public = 'public',
  Private = 'private',
}

export interface CdnMedia extends MetadataFields {
  id: UUID
  type: CdnMediaType
  url: string
  alt: string | null
  slug: string | null
}

export interface CdnMediaExtended extends CdnMedia {
  relations_count: number
}

interface CdnMediaCommonCreate {
  id?: UUID
  alt?: string
  slug?: string
  metadata?: Record<string, string>
  metadata_private?: Record<string, string>
}

export interface CdnMediaUploadDto extends CdnMediaCommonCreate {
  source?: CdnMediaSource.Silverbox
  /**
   * For node environment, there can also be a Buffer or a ReadStream object (result of `fs.createReadStream`)
   */
  file: FileUploadDto
}

export interface CdnMediaExternalCreateDto extends CdnMediaCommonCreate {
  source: CdnMediaSource.External
  type: CdnMediaType
  url: string
}

export type CdnMediaCreateDto = CdnMediaUploadDto | CdnMediaExternalCreateDto

export interface CdnMediaUpdateDto {
  alt?: string
  slug?: string
}
