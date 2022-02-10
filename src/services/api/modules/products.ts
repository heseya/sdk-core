import { CrudService, ServiceFactory } from '../types/Service'
import { getApiCall, getOneApiCall } from '../utils/calls'

import { Product, ListProduct } from '../../../interfaces/Product'

export type ProductsService = CrudService<Product, ListProduct>

export const createProductsService: ServiceFactory<ProductsService> = (axios) => ({
  getOne: getOneApiCall<Product>(axios, 'products'),
  get: getApiCall<ListProduct>(axios, 'products'),
})
