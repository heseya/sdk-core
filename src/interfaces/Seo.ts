import { CdnMedia } from './CdnMedia'
import { UUID } from './UUID'
import { PublishedTranslations, PublishedTranslationsUpdateDto, Translations } from './languages'

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
}

export interface SeoMetadata
  extends SeoMetadataTranslatable,
    PublishedTranslations,
    Translations<SeoMetadataTranslatable> {
  og_image?: CdnMedia
  twitter_card?: TwitterCardType
  no_index?: boolean
  header_tags?: SeoMetadataTag[]
}

export interface SeoMetadataDto
  extends PublishedTranslationsUpdateDto,
    Translations<SeoMetadataTranslatable> {
  og_image_id?: UUID | null
  twitter_card?: TwitterCardType
  no_index?: boolean
  header_tags?: SeoMetadataTag[]
}

export type SeoCheckModelType = 'Product' | 'ProductSet' | 'Page'

export interface SeoCheckResponse {
  duplicated: boolean
  duplicates: { id: UUID; model_type: SeoCheckModelType }[]
}
