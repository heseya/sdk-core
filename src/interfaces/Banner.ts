import { CdnMedia } from './CdnMedia'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UUID } from './UUID'
import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  Translations,
  TranslationsCreateDto,
} from './languages'

export interface Banner extends MetadataFields {
  id: UUID
  slug: string
  name: string
  active: boolean
  banner_media: BannerMedia[]
}

interface TranslatableBannerMedia {
  title: string | null
  subtitle: string | null
}

export interface BannerMedia
  extends TranslatableBannerMedia,
    PublishedTranslations,
    Translations<TranslatableBannerMedia> {
  id: UUID
  order: number
  url: string | null
  media: { min_screen_width: number; media: CdnMedia }[]
}

export interface BannerCreateDto extends CreateMetadataFields {
  slug: string
  name: string
  active: boolean
  banner_media: BannerMediaCreateDto[]
}
export type BannerUpdateDto = Omit<BannerCreateDto, keyof CreateMetadataFields>

export interface BannerMediaCreateDto
  extends PublishedTranslationsCreateDto,
    TranslationsCreateDto<TranslatableBannerMedia> {
  url?: string | null
  media: { min_screen_width: number; media: UUID }[]
}
export type BannerMediaUpdateDto = Partial<BannerMediaCreateDto>
