import { CdnMedia } from './CdnMedia'
import { UUID } from './UUID'

export interface Banner {
  id: UUID
  slug: string
  url: string
  name: string
  active: boolean
  responsive_media: ResponsiveMedia[]
}

export type ResponsiveMedia = { min_screen_width: number; media: CdnMedia }[]

export interface BannerCreateDto {
  slug: string
  url: string
  name: string
  active: boolean
  responsive_media: ResponsiveMediaCreateDto[]
}
export type BannerUpdateDto = BannerCreateDto

export type ResponsiveMediaCreateDto = { min_screen_width: number; media: UUID }[]
export type ResponsiveMediaUpdateDto = ResponsiveMediaCreateDto
