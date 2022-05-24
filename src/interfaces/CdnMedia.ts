import { CreateMetadataFields, MetadataFields } from './Metadata'

export enum CdnMediaType {
  Photo = 'photo',
  Video = 'video',
  Pdf = 'pdf',
}

export interface CdnMedia extends MetadataFields {
  id: string
  type: CdnMediaType
  url: string
  alt?: string
  slug?: string
}

export interface CdnMediaCreateDto extends CreateMetadataFields {
  file: File
  alt?: string
  metadata?: Record<string, string>
  metadata_private?: Record<string, string>
}

export interface CdnMediaUpdateDto {
  alt?: string
  slug?: string
}
