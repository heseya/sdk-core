import { CdnMedia } from './CdnMedia'
import { UUID } from './UUID'

export interface Banner {
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

export interface BannerCreateDto {
  slug: string
  name: string
  active: boolean
  banner_media: BannerMediaCreateDto[]
}
export type BannerUpdateDto = BannerCreateDto

export interface BannerMediaCreateDto {
  url: string | null
  title: string | null
  subtitle: string | null
  media: { min_screen_width: number; media: UUID }[]
}
export type BannerMediaUpdateDto = Partial<BannerMediaCreateDto>
