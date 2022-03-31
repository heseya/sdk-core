import { Schema } from './Schema'
import { ProductSet } from './ProductSet'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'
import { SeoMetadataDto } from './Seo'
import { CdnMedia } from './CdnMedia'
import { ProductAttribute, ProductListAttribute } from './Attribute'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { Tag } from './Tag'

export interface ProductList extends MetadataFields {
  id: UUID
  name: string
  slug: string
  cover: CdnMedia
  price: number
  price_max: number
  price_min: number
  quantity_step: number
  tags: Tag[]
  public: boolean
  visible: boolean
  available: boolean
  attributes: ProductListAttribute[]
}

export interface Product extends Omit<ProductList, 'attributes'> {
  description_html: string
  description_short: string
  // @deprecated
  meta_description: string
  sets: ProductSet[]
  schemas: Schema[]
  gallery: CdnMedia[]
  seo: SeoMetadata | null
  attributes: ProductAttribute[]
}

export interface ProductCreateDto extends CreateMetadataFields {
  name: string
  slug: string
  price: number
  description_html: string
  description_short: string
  public: boolean
  quantity_step: number
  sets: UUID[]
  tags: UUID[]
  schemas: UUID[]
  media: UUID[]
  seo: SeoMetadataDto
  /**
   * Attribute.id -> AttributeOption.id[]
   */
  attributes: Record<UUID, UUID[]>
}

export type ProductUpdateDto = Omit<ProductCreateDto, keyof CreateMetadataFields>
