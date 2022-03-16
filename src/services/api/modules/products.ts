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
import { createEntityMetadataService, EntityMetadataService } from './metadata'

interface ProductsListParams extends SearchParam {
  name?: string
  slug?: string
  public?: boolean
  sets?: UUID[]
  sort?: string
  tags?: UUID[]
  ids?: UUID[]
  available?: boolean
}

export type ProductsService = CrudService<Product, ListProduct, ProductDto, ProductsListParams> &
  EntityMetadataService

export const createProductsService: ServiceFactory<ProductsService> = (axios) => {
  const route = 'products'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
    ...createEntityMetadataService(axios, route),
  }
}
