/* eslint-disable camelcase */

import { CreateMetadataFields, MetadataFields } from './Metadata'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'

export interface PageList extends MetadataFields {
  id: UUID
  name: string
  slug: string
  content_html: string
  public: boolean
  order: number
}

export interface Page extends PageList {
  content_html: string
  // @deprecated
  meta_description: string
  seo?: SeoMetadata
}

export type PageCreateDto = Omit<Page, 'id' | keyof MetadataFields> & CreateMetadataFields
export type PageUpdateDto = Omit<PageCreateDto, keyof CreateMetadataFields>
