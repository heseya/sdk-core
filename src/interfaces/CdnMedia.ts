export enum CdnMediaType {
  Photo = 'photo',
  Video = 'video',
}

export interface CdnMedia {
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
