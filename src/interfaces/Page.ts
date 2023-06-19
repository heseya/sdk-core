/* eslint-disable camelcase */

import { CreateMetadataFields, MetadataFields } from './Metadata'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'

export interface PageList extends MetadataFields {
  id: UUID
  name: string
  slug: string
  public: boolean
}

export interface Page extends PageList {
  content_html: string
  seo?: SeoMetadata
}

export interface PageCreateDto extends CreateMetadataFields {
  name: string
  slug: string
  content_html: string
  public?: boolean
  seo?: SeoMetadata
}

export type PageUpdateDto = Partial<Omit<PageCreateDto, keyof CreateMetadataFields>>
