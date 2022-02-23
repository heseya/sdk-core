import { Schema } from './Schema'
import { ProductSet } from './ProductSet'
import { SeoMetadata } from './Seo'

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

export interface Product {
  id: string | number
  name: string
  slug: string
  price: number
  price_min: number
  price_max: number
  description_html: string
  description_short: string
  // @deprecated
  meta_description: string
  public: boolean
  visible: boolean
  available: boolean
  quantity_step: number
  sets: ProductSet[]
  schemas: Schema[]
  gallery: Media[]
  cover: Media
  tags: Tag[]
  seo: SeoMetadata | null
}
