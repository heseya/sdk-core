/* eslint-disable camelcase */

import { SeoMetadata } from './Seo'
import { UUID } from './UUID'

export interface ListPage {
  id: UUID
  name: string
  slug: string
  content_html: string
  public: boolean
  order: number
}

export interface Page extends ListPage {
  content_html: string
  // @deprecated
  meta_description: string
  seo?: SeoMetadata
}
