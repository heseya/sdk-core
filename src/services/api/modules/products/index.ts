import { CrudService, ServiceFactory } from '../../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createGetSimpleListRequest,
  createPatchRequest,
  createPostRequest,
} from '../../utils/requests'

import { UUID } from '../../../../interfaces/UUID'
import {
  Product,
  ProductList,
  ProductCreateDto,
  ProductUpdateDto,
} from '../../../../interfaces/Product'
import { MetadataParams, PaginationParams, SearchParam } from '../../types/DefaultParams'
import { createEntityMetadataService, EntityMetadataService } from '../metadata'
import { createEntityAuditsService, EntityAuditsService } from '../audits'
import { Attribute, LanguageParams, ListResponse } from '../../../../interfaces'
import { FieldSort } from '../../../../interfaces/Sort'
import { ProductAttachmentsService, createProductAttachmentsService } from './attachments'

type DateAttributeFilterValue = { min: Date } | { max: Date } | { min: Date; max: Date }
type NumberAttributeFilterValue = { min: number } | { max: number } | { min: number; max: number }
type CurrencyAttributeFilterValue = NumberAttributeFilterValue & { currency: string }
type AttributeFilter = Record<
  string,
  UUID | UUID[] | DateAttributeFilterValue | NumberAttributeFilterValue
>

interface ProductsListParams extends SearchParam, PaginationParams, LanguageParams, MetadataParams {
  name?: string
  slug?: string
  public?: boolean
  sets?: UUID[]
  sets_not?: UUID[]
  /**
   * Sort products
   * Use array syntax, string value is deprecated and will be removed in future
   */
  sort?:
    | string
    | Array<
        | FieldSort<'name'>
        | FieldSort<'price'>
        | FieldSort<'public'>
        | FieldSort<`attribute.${string}`>
        | FieldSort<`set.${string}`>
      >
  tags?: UUID[]
  tags_not?: UUID[]
  ids?: UUID[]
  available?: boolean
  has_cover?: boolean
  has_items?: boolean
  has_schemas?: boolean
  shipping_digital?: boolean
  attribute?: AttributeFilter
  attribute_not?: Record<string, UUID | UUID[]>
  price?: CurrencyAttributeFilterValue
}

export interface ProductsService
  extends Omit<
      CrudService<Product, ProductList, ProductCreateDto, ProductUpdateDto, ProductsListParams>,
      'get'
    >,
    EntityMetadataService,
    EntityAuditsService<Product> {
  /**
   * Return a list of products
   */
  get(params?: ProductsListParams & { full?: false }): Promise<ListResponse<ProductList>>
  get(params: ProductsListParams & { full: true }): Promise<ListResponse<Product>>

  /**
   * Return a list of available Google Product Categories for given language
   */
  getGoogleCategories(lang: string): Promise<{ id: number; name: string }[]>

  getFilters(props?: { sets?: UUID[] }): Promise<Attribute[]>

  Attachments: ProductAttachmentsService
}

export const createProductsService: ServiceFactory<ProductsService> = (axios) => {
  const route = 'products'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    async getGoogleCategories(lang) {
      const response = await axios.get<{ data: { id: number; name: string }[] }>(
        `/google-categories/${lang}`,
      )
      return response.data.data
    },

    getFilters: createGetSimpleListRequest(axios, 'filters'),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),

    Attachments: createProductAttachmentsService(axios),
  }
}
