/* eslint-disable camelcase */

import { SeoMetadata } from './Seo'

export interface Page {
  id: string
  name: string
  slug: string
  content_html: string
  public: boolean
  seo: SeoMetadata | null
}
