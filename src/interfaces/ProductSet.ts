import { Media } from './Product'
import { SeoMetadata } from './Seo'

export interface ProductSet {
  id: string | number
  slug: string
  name: string
  cover: Media | null
  description_html: string
  public: boolean
  visible: boolean
  hide_on_index: boolean
  parent?: ProductSet | null
  parent_id?: string | null
  children?: ProductSet[]
  children_ids?: string[]
  seo: SeoMetadata | null
}
