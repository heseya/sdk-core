import { Media } from './Product'

export enum TwitterCardType {
  Summary = 'summary',
  SummaryLargeImage = 'summary_large_image',
}

export interface SeoMetadata {
  title?: string
  description?: string
  keywords?: string[]
  og_image?: Media
  twitter_card?: TwitterCardType
  no_index?: boolean
}
