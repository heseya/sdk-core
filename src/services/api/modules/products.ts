import { CrudService, ServiceFactory } from '../types/Service'
import { createGetListRequest, createGetOneRequest } from '../utils/requests'

import { Product, ListProduct } from '../../../interfaces/Product'

export type ProductsService = CrudService<Product, ListProduct>

export const createProductsService: ServiceFactory<ProductsService> = (axios) => {
  const route = 'products'
  return {
    getOne: createGetOneRequest<Product>(axios, route),
    getOneById: createGetOneRequest<Product>(axios, route, { byId: true }),
    get: createGetListRequest<ListProduct>(axios, route),
  }
}
