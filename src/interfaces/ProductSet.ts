import { ProductSetAttribute } from './Attribute'
import { CdnMedia } from './CdnMedia'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { SeoMetadata, SeoMetadataDto } from './Seo'
import { UUID } from './UUID'

export interface ProductSetList extends MetadataFields {
  id: UUID
  name: string
  slug: string
  slug_suffix: string
  slug_override: boolean
  cover: CdnMedia | null
  public: boolean
  visible: boolean
  hide_on_index: boolean
  attributes: ProductSetAttribute[]
  parent_id: string | null
  children?: ProductSet[]
  children_ids?: UUID[]
}

export interface ProductSet extends Omit<ProductSetList, 'parent_id'> {
  parent: ProductSetList | null
  description_html: string
  seo: SeoMetadata | null
}

export interface ProductSetCreateDto extends CreateMetadataFields {
  name: string
  slug_suffix: string
  slug_override: boolean
  parent_id?: UUID | null
  seo?: SeoMetadataDto
  public?: boolean
  hide_on_index?: boolean
  children_ids?: UUID[]
  description_html?: string
  cover_id?: UUID
  attributes?: UUID[]
}

export type ProductSetUpdateDto = Omit<ProductSetCreateDto, keyof CreateMetadataFields>
