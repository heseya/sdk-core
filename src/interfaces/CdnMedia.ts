import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UUID } from './UUID'

export enum CdnMediaType {
  Photo = 'photo',
  Video = 'video',
  Pdf = 'pdf',
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

export interface CdnMediaCreateDto extends CreateMetadataFields {
  file: File
  alt?: string
  slug?: string
  metadata?: Record<string, string>
  metadata_private?: Record<string, string>
}

export interface CdnMediaUpdateDto {
  alt?: string
  slug?: string
}
