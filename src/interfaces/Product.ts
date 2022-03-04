import { Schema } from './Schema'
import { ProductSet } from './ProductSet'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'
import { SeoMetadataDto } from './Seo'
import { CdnMedia } from './CdnMedia'

export interface Tag {
  id: UUID
  name: string
  color: string
}

export interface ListProduct {
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
}

export interface Product extends ListProduct {
  description_html: string
  description_short: string
  // @deprecated
  meta_description: string
  sets: ProductSet[]
  schemas: Schema[]
  gallery: CdnMedia[]
  seo: SeoMetadata | null
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
}
