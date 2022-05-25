import { Schema } from './Schema'
import { ProductSet } from './ProductSet'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'
import { SeoMetadataDto } from './Seo'
import { CdnMedia } from './CdnMedia'
import { ProductAttribute, ProductListAttribute } from './Attribute'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { Tag } from './Tag'
import { CartItemSchemaValue } from './CartItem'
import { OrderDiscount, Sale } from './SalesAndCoupons'
import { ProductWarehouseItem, ProductWarehouseItemDto, WarehouseDeposit } from './WarehouseItem'

export interface ProductList extends MetadataFields {
  id: UUID
  name: string
  slug: string
  cover: CdnMedia | null
  price: number
  price_max: number
  price_min: number
  vat_rate: number
  price_max_initial: number
  price_min_initial: number
  shipping_time: number | null
  shipping_date: string | null
  quantity_step: number
  google_product_category: null | number
  tags: Tag[]
  public: boolean
  visible: boolean
  available: boolean
  attributes: ProductListAttribute[]
}

export interface Product extends Omit<ProductList, 'attributes'> {
  description_html: string
  description_short: string
  sales: Sale[]
  sets: ProductSet[]
  schemas: Schema[]
  gallery: CdnMedia[]
  seo: SeoMetadata | null
  attributes: ProductAttribute[]
  items: ProductWarehouseItem[]
}

export interface ProductCreateDto extends CreateMetadataFields {
  name: string
  slug: string
  price: number
  public: boolean
  description_html?: string
  description_short?: string
  quantity_step?: number
  vat_rate?: number
  google_product_category?: number
  sets?: UUID[]
  tags?: UUID[]
  schemas?: UUID[]
  media?: UUID[]
  seo?: SeoMetadataDto
  /**
   * Attribute.id -> AttributeOption.id[]
   */
  attributes?: Record<UUID, UUID[]>
  items?: ProductWarehouseItemDto[]
}

export type ProductUpdateDto = Partial<Omit<ProductCreateDto, keyof CreateMetadataFields>>

//? ------------------------------------------------------------

export interface OrderProduct {
  name: string
  quantity: number
  price: number
  price_initial: number
  vat_rate: number
  discounts: OrderDiscount[]
  product: Product
  schemas: CartItemSchemaValue[]
  deposits: WarehouseDeposit[]
}
