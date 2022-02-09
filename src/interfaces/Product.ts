import { Schema } from './Schema'
import { ProductSet } from './ProductSet'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'

export interface Media {
  id: string | number
  url: string
  type: string
  alt: string | null
}

export interface Tag {
  id: string
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
}

export interface Product extends ListProduct {
  description_html: string
  description_short: string
  // @deprecated
  meta_description: string
  sets: ProductSet[]
  schemas: Schema[]
  gallery: Media[]
  seo: SeoMetadata | null
}
