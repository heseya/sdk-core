import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  creategetOneBySlugRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { ProductSet, ProductSetList } from '../../../interfaces/ProductSet'

// TODO: param types
export type ProductSetsService = CrudService<ProductSet, ProductSetList>

export const createProductSetsService: ServiceFactory<ProductSetsService> = (axios) => {
  const route = 'product-sets'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: creategetOneBySlugRequest(axios, route),
    getOne: creategetOneBySlugRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
