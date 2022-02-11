import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { Product, ListProduct } from '../../../interfaces/Product'

// TODO: param types
export type ProductsService = CrudService<Product, ListProduct>

export const createProductsService: ServiceFactory<ProductsService> = (axios) => {
  const route = 'products'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route),
    getOneById: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
