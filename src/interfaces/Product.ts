import { Schema } from './Schema'
import { Category } from './Category'
import { Brand } from './Brand'

export interface Media {
  id: string | number
  url: string
  type: string
}

export interface Product {
  id: string | number
  schemas: Schema[]
  price: number
  name: string
  slug: string
  brand: Brand
  category: Category
  quantity_step: number
  description_md: string
  description_html: string
  meta_description: string
  available: boolean
  public: boolean
  visible: boolean
  cover?: Media
  gallery: Media[]
}
