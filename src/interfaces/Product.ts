import { OrderSchema, Schema } from './Schema'
import { ProductSet, ProductSetList } from './ProductSet'
import { SeoMetadata } from './Seo'
import { UUID } from './UUID'
import { SeoMetadataDto } from './Seo'
import { CdnMedia } from './CdnMedia'
import { ProductAttribute, ProductListAttribute } from './Attribute'
import { CreateMetadataFields, MetadataFields } from './Metadata'
import { Tag } from './Tag'
import { OrderDiscount, ProductSale } from './SalesAndCoupons'
import { ProductWarehouseItem, ProductWarehouseItemDto, WarehouseDeposit } from './WarehouseItem'
import { ProductAttachment } from './ProductAttachment'
import { PageList } from './Page'
import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'
import { Price, PriceDto } from './Price'
import { StrNumber } from './Number'
import { BannerMedia, BannerMediaCreateDto } from './Banner'

interface ProductListTranslatable {
  name: string
}
interface ProductTranslatable extends ProductListTranslatable {
  description_html: string
  description_short: string
}

export interface ProductBase {
  id: UUID
  slug: string
  name: string
  /**
   * Contains base price for every currency
   */
  prices_base: Price[]
  prices_max: Price[]
  prices_min: Price[]
  public: boolean
  visible: boolean
  available: boolean
  cover: CdnMedia | null
}

export interface ProductList
  extends ProductBase,
    MetadataFields,
    PublishedTranslations,
    Translations<ProductListTranslatable> {
  prices_max_initial: Price[]
  prices_min_initial: Price[]
  shipping_time: number | null
  shipping_date: string | null
  quantity_step: number
  google_product_category: null | number
  tags: Tag[]
  /**
   * Indicates if the product has at least one schema, so it cannot be added to cart directly
   */
  has_schemas: boolean
  /**
   * If true, the product will be available to deliver only via ShippingType.Digital methods
   */
  shipping_digital: boolean
  /**
   * If not null, single user can buy only this amount of products
   */
  purchase_limit_per_user: null | number
  attributes: ProductListAttribute[]
}

export interface Product
  extends Omit<ProductList, 'attributes' | 'translations'>,
    PublishedTranslations,
    ProductTranslatable,
    Translations<ProductTranslatable> {
  sales: ProductSale[]
  sets: ProductSet[]
  schemas: Schema[]
  gallery: CdnMedia[]
  seo: SeoMetadata | null
  attributes: ProductAttribute[]
  items: ProductWarehouseItem[]
  attachments: ProductAttachment[]
  /**
   * Sets of products, which are related to this product
   */
  related_sets: ProductSetList[]
  /**
   * Order by which the product will be sorted in the catalog (lower is the higher)
   */
  order: number | null
  /**
   * Quantity of the product in the system
   * `null` means, that product has infinity quantity
   */
  quantity: number | null
  descriptions: PageList[]
  banner: Omit<BannerMedia, 'published'> | null
}

export interface ProductCreateDto
  extends CreateMetadataFields,
    PublishedTranslationsCreateDto,
    TranslationsCreateDto<ProductTranslatable> {
  id?: UUID
  slug: string
  /**
   * Must contain base price for every currency
   */
  prices_base: PriceDto[]
  public: boolean
  /**
   * If true, the product will be available to deliver only via ShippingType.Digital methods
   */
  shipping_digital: boolean
  /**
   * Order by which the product will be sorted in the catalog (lower is the higher)
   */
  order?: number
  google_product_category?: number | null
  description_html?: string
  description_short?: string
  quantity_step?: number
  sets?: UUID[]
  tags?: UUID[]
  schemas?: UUID[]
  media?: UUID[]
  /**
   * ID[] of the Pages
   */
  descriptions?: UUID[]
  /**
   * ID[] of the ProductSets
   */
  related_sets?: UUID[]
  seo?: SeoMetadataDto
  /**
   * Attribute.id -> AttributeOption.id[]
   */
  attributes?: Record<UUID, UUID[]>
  items?: ProductWarehouseItemDto[]
  /**
   * If not null, single user can buy only this amount of products
   */
  purchase_limit_per_user?: null | number
  banner?: Omit<BannerMediaCreateDto, 'published'> | null
}

export type ProductUpdateDto = Partial<Omit<ProductCreateDto, keyof CreateMetadataFields | 'id'>> &
  PublishedTranslationsUpdateDto &
  TranslationsUpdateDto<ProductTranslatable>

//? ------------------------------------------------------------

export interface OrderProductUrl {
  id: UUID
  name: string
  url: string
}

export interface OrderProduct {
  id: UUID
  name: string
  quantity: number
  price: StrNumber
  price_initial: StrNumber
  discounts: OrderDiscount[]
  product: Product
  schemas: OrderSchema[]
  deposits: WarehouseDeposit[]
  /**
   * Indicates if the urls of this product was sent to the customer
   */
  is_delivered: boolean
  /**
   * Indicates if the product needs to have a digital shipping method
   */
  shipping_digital: boolean
  urls: OrderProductUrl[]
}

export type OrderProductPublic = Omit<OrderProduct, 'discounts' | 'deposits' | 'is_delivered'> & {
  order_id: UUID
  currency: string
}

export interface OrderProductUpdateDto {
  is_delivered?: boolean
  urls?: { [name: string]: string | null | undefined }
}

export interface ProductPrice {
  id: UUID
  prices_min: Price[]
  prices_max: Price[]
}
