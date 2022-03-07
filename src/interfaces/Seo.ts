import { CdnMedia } from './CdnMedia'
import { UUID } from './UUID'

export enum TwitterCardType {
  Summary = 'summary',
  SummaryLargeImage = 'summary_large_image',
}

export interface SeoMetadata {
  title?: string
  description?: string
  keywords?: string[]
  og_image?: CdnMedia
  twitter_card?: TwitterCardType
  no_index?: boolean
}

export interface SeoMetadataDto {
  title?: string
  description?: string
  keywords?: string[]
  og_image_id?: UUID | null
  twitter_card?: TwitterCardType
  no_index?: boolean
}

export type SeoCheckModelType = 'Product' | 'ProductSet' | 'Page'

export interface SeoCheckResponse {
  duplicated: boolean
  duplicates: { id: UUID; model_type: SeoCheckModelType }[]
}
