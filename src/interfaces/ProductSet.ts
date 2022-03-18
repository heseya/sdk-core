import { Attribute } from './Attribute'
import { CdnMedia } from './CdnMedia'
import { MetadataFields } from './Metadata'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'

export interface ProductSetList extends MetadataFields {
  id: UUID
  slug: string
  name: string
  cover: CdnMedia | null
  public: boolean
  visible: boolean
  hide_on_index: boolean
  parent?: ProductSet | null
  parent_id?: string | null
  children?: ProductSet[]
  children_ids?: string[]
}

export interface ProductSet extends ProductSetList {
  description_html: string
  attributes: Attribute[]
  seo: SeoMetadata | null
}
