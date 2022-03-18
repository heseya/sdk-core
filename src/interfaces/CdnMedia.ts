import { MetadataFields } from './Metadata'

export enum CdnMediaType {
  Photo = 'photo',
  Video = 'video',
}

export interface CdnMedia extends MetadataFields {
  id: string
  type: CdnMediaType
  url: string
  alt?: string
  slug?: string
}

export interface CdnMediaUpdateDto {
  alt?: string
  slug?: string
}
