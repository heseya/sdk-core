import { CdnMedia } from './CdnMedia'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UUID } from './UUID'

export interface Banner extends MetadataFields {
  id: UUID
  slug: string
  name: string
  active: boolean
  banner_media: BannerMedia[]
}

export interface BannerMedia {
  id: UUID
  order: number
  url: string | null
  title: string | null
  subtitle: string | null
  media: { min_screen_width: number; media: CdnMedia }[]
}

export interface BannerCreateDto extends CreateMetadataFields {
  slug: string
  name: string
  active: boolean
  banner_media: BannerMediaCreateDto[]
}
export type BannerUpdateDto = Omit<BannerCreateDto, keyof CreateMetadataFields>

export interface BannerMediaCreateDto {
  url?: string | null
  title?: string | null
  subtitle?: string | null
  media: { min_screen_width: number; media: UUID }[]
}
export type BannerMediaUpdateDto = Partial<BannerMediaCreateDto>
