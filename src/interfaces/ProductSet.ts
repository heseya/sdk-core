import { Attribute } from './Attribute'
import { CdnMedia } from './CdnMedia'
import { CreateMetadataFields, MetadataFields } from './Metadata'
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

export interface ProductSetCreateDto extends CreateMetadataFields {
  name: string
  slug_suffix: string
  slug_override: boolean
  public?: boolean
  hide_on_index?: boolean
  parent_id?: UUID
  children_ids?: UUID[]
  description_html?: string
  cover_id?: UUID
  attributes?: UUID[]
  seo?: SeoMetadata
}

export type ProductSetUpdateDto = Omit<ProductSetCreateDto, keyof CreateMetadataFields>
