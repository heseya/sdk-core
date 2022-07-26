import { CreateMetadataFields, MetadataFields } from './Metadata'

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
