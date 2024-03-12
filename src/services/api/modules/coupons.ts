import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { MetadataParams, PaginationParams, SearchParam } from '../types/DefaultParams'
import {
  Coupon,
  CouponCreateDto,
  CouponList,
  CouponUpdateDto,
} from '../../../interfaces/SalesAndCoupons'
import { UUID } from '../../../interfaces/UUID'

interface CouponsListParams extends SearchParam, PaginationParams, MetadataParams {
  search?: string
  code?: string
  description?: string
  ids?: UUID[]
}

export type CouponsService = CrudService<
  Coupon,
  CouponList,
  CouponCreateDto,
  CouponUpdateDto,
  CouponsListParams
> &
  EntityMetadataService

export const createCouponsService: ServiceFactory<CouponsService> = (axios) => {
  const route = 'coupons'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    getOneBySlug: createGetOneRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
