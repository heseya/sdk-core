import { CrudService, ServiceFactory } from '../types/Service'
import { getApiCall, getOneApiCall } from '../utils/calls'

import { ProductSet, ProductSetList } from '../../../interfaces/ProductSet'

export type ProductSetsService = CrudService<ProductSet, ProductSetList>

export const createProductSetsService: ServiceFactory<ProductSetsService> = (axios) => ({
  getOne: getOneApiCall<ProductSet>(axios, 'product-sets'),
  get: getApiCall<ProductSetList>(axios, 'product-sets'),
})
