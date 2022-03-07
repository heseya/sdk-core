import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { UUID } from '../../../interfaces/UUID'
import { Product, ListProduct, ProductDto } from '../../../interfaces/Product'
import { SearchParam } from '../types/DefaultParams'

type DateAttributeFilterValue = { min: Date } | { max: Date } | { min: Date; max: Date }
type NumberAttributeFilterValue = { min: number } | { max: number } | { min: number; max: number }
type AttributeFilter = Record<
  string,
  string | string[] | DateAttributeFilterValue | NumberAttributeFilterValue
>

interface ProductsListParams extends SearchParam {
  name?: string
  slug?: string
  public?: boolean
  sets?: UUID[]
  sort?: string
  tags?: UUID[]
  available?: boolean
  attribute?: AttributeFilter
  price?: NumberAttributeFilterValue
}

export type ProductsService = CrudService<Product, ListProduct, ProductDto, ProductsListParams>

export const createProductsService: ServiceFactory<ProductsService> = (axios) => {
  const route = 'products'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
