import { Schema } from './Schema'
import { ProductSet } from './ProductSet'

export interface Media {
  id: string | number
  url: string
  type: string
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
  description_html: string
  public: boolean
  visible: boolean
  available: boolean
  quantity_step: number
  brand?: ProductSet
  category?: ProductSet
  sets: ProductSet[]
  schemas: Schema[]
  gallery: Media[]
  cover: Media
  tags: Tag[]
}
