import { CdnMedia } from './CdnMedia'
import { UUID } from './UUID'
import { PublishedTranslationsUpdateDto, TranslationsUpdateDto } from './languages'

export enum TwitterCardType {
  Summary = 'summary',
  SummaryLargeImage = 'summary_large_image',
}

export interface SeoMetadataTag {
  type: 'script' | 'link' | 'meta'
  // TODO: more specific types?
  [key: string]: string | boolean | undefined
}

export interface SeoMetadataTranslatable {
  title?: string
  /**
   * Max 1000 characters
   */
  description?: string
  keywords?: string[]
  no_index?: boolean
}

export interface SeoMetadata
  extends SeoMetadataTranslatable,
    PublishedTranslationsUpdateDto,
    TranslationsUpdateDto<SeoMetadataTranslatable> {
  og_image?: CdnMedia
  twitter_card?: TwitterCardType
  header_tags?: SeoMetadataTag[]
}

export type FlatSeoMetadata = Omit<SeoMetadata, 'translations' | 'published'>

export interface SeoMetadataDto
  extends PublishedTranslationsUpdateDto,
    TranslationsUpdateDto<SeoMetadataTranslatable> {
  og_image_id?: UUID | null
  twitter_card?: TwitterCardType
  header_tags?: SeoMetadataTag[]
}

export type SeoCheckModelType = 'Product' | 'ProductSet' | 'Page'

export interface SeoCheckResponse {
  duplicated: boolean
  duplicates: { id: UUID; model_type: SeoCheckModelType }[]
}
