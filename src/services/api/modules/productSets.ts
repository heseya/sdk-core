import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { ProductSet, ProductSetList } from '../../../interfaces/ProductSet'
import { SearchParam } from '../types/DefaultParams'

interface ProductSetsListParams extends SearchParam {
  root?: boolean
  tree?: boolean
  name?: string
  slug?: string
  public?: boolean
}

export type ProductSetsService = CrudService<ProductSet, ProductSetList, ProductSetsListParams>

export const createProductSetsService: ServiceFactory<ProductSetsService> = (axios) => {
  const route = 'product-sets'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
