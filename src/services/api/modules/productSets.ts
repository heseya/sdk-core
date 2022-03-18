import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { ProductSet, ProductSetList } from '../../../interfaces/ProductSet'
import { DefaultParams, MetadataParams, SearchParam } from '../types/DefaultParams'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { ReorderEntityRequest } from '../types/Reorder'
import { createReorderPostRequest } from '../utils/reorder'
import { UUID } from '../../../interfaces/UUID'
import { stringifyQueryParams } from '../utils/stringifyQueryParams'

interface ProductSetsListParams extends SearchParam, MetadataParams {
  root?: boolean
  tree?: boolean
  name?: string
  slug?: string
  public?: boolean
}

export interface ProductSetsService
  extends CrudService<ProductSet, ProductSetList, ProductSetsListParams>,
    EntityMetadataService {
  reorder: ReorderEntityRequest
  reorderChild: (parentId: UUID, ids: UUID[], params?: DefaultParams) => Promise<true>
}

export const createProductSetsService: ServiceFactory<ProductSetsService> = (axios) => {
  const route = 'product-sets'
  const reorderBodyKey = 'product_sets'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    reorder: createReorderPostRequest(axios, route, reorderBodyKey),

    async reorderChild(parentId, ids, params) {
      const stringParams = stringifyQueryParams(params || {})

      await axios.post(`/${route}/reorder/id:${parentId}?${stringParams}`, {
        [reorderBodyKey]: ids,
      })

      return true
    },

    ...createEntityMetadataService(axios, route),
  }
}
