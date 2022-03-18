import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { PaginationParams, SearchParam } from '../types/DefaultParams'
import { DiscountCode, DiscountCodeDto } from '../../../interfaces/DiscountCode'
import { createEntityAuditsService, EntityAuditsService } from './audits'

interface DiscountsListParams extends SearchParam, PaginationParams {
  code?: string
  description?: string
}

export type DiscountsService = Omit<
  CrudService<DiscountCode, DiscountCode, DiscountCodeDto, DiscountsListParams>,
  'getOne'
> &
  EntityMetadataService &
  EntityAuditsService<DiscountCode>

export const createDiscountsService: ServiceFactory<DiscountsService> = (axios) => {
  const route = 'discounts'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
