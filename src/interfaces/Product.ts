import { Schema } from './Schema'
import { ProductSet } from './ProductSet'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'
import { SeoMetadataDto } from './Seo'
import { ProductAttribute, ProductListAttribute } from './Attribute'

export interface Media {
  id: UUID
  url: string
  type: string
  alt: string | null
}

export interface Tag {
  id: UUID
  name: string
  color: string
}

export interface ListProduct {
  id: UUID
  name: string
  slug: string
  cover: Media
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

export interface Product extends Omit<ListProduct, 'attributes'> {
  description_html: string
  description_short: string
  // @deprecated
  meta_description: string
  sets: ProductSet[]
  schemas: Schema[]
  gallery: Media[]
  seo: SeoMetadata | null
  attributes: ProductAttribute[]
}

export interface ProductDto {
  id?: UUID // TODO: remove
  name: string
  slug: string
  price: number
  description_html: string
  description_short: string
  digital: boolean
  public: boolean
  quantity_step: number
  sets: UUID[]
  tags: UUID[]
  schemas: UUID[]
  media: UUID[]
  seo: SeoMetadataDto
  attributes: Record<UUID, UUID>
}
