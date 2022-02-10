import { CrudService, ServiceFactory } from '../types/Service'
import { createGetListRequest, createGetOneRequest } from '../utils/requests'

import { ProductSet, ProductSetList } from '../../../interfaces/ProductSet'

export type ProductSetsService = CrudService<ProductSet, ProductSetList>

export const createProductSetsService: ServiceFactory<ProductSetsService> = (axios) => {
  const route = 'product-sets'
  return {
    getOne: createGetOneRequest<ProductSet>(axios, route),
    getOneById: createGetOneRequest<ProductSet>(axios, route, { byId: true }),
    get: createGetListRequest<ProductSetList>(axios, route),
  }
}
