import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createGetSimpleListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { UUID } from '../../../interfaces/UUID'
import {
  Product,
  ProductList,
  ProductCreateDto,
  ProductUpdateDto,
} from '../../../interfaces/Product'
import { MetadataParams, PaginationParams, SearchParam } from '../types/DefaultParams'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { createEntityAuditsService, EntityAuditsService } from './audits'
import { Attribute, ListResponse } from '../../../interfaces'

type DateAttributeFilterValue = { min: Date } | { max: Date } | { min: Date; max: Date }
type NumberAttributeFilterValue = { min: number } | { max: number } | { min: number; max: number }
type AttributeFilter = Record<
  string,
  UUID | UUID[] | DateAttributeFilterValue | NumberAttributeFilterValue
>

interface ProductsListParams extends SearchParam, PaginationParams, MetadataParams {
  name?: string
  slug?: string
  public?: boolean
  sets?: UUID[]
  sets_not?: UUID[]
  sort?: string
  tags?: UUID[]
  tags_not?: UUID[]
  ids?: UUID[]
  available?: boolean
  has_cover?: boolean
  attribute?: AttributeFilter
  attribute_not?: Record<string, UUID | UUID[]>
  price?: NumberAttributeFilterValue
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
  get(params: ProductsListParams & { full?: false }): Promise<ListResponse<ProductList>>
  get(params: ProductsListParams & { full: true }): Promise<ListResponse<Product>>

  getFilters(props?: { sets?: UUID[] }): Promise<Attribute[]>
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

    getFilters: createGetSimpleListRequest(axios, 'filters'),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
