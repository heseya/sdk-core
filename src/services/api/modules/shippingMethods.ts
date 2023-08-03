import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createGetSimpleListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { MetadataParams, PaginationParams } from '../types/DefaultParams'
import {
  ShippingCountry,
  ShippingMethod,
  ShippingMethodCreateDto,
  ShippingMethodUpdateDto,
} from '../../../interfaces/ShippingMethod'
import { ReorderEntityRequest } from '../types/Reorder'
import { createReorderPostRequest } from '../utils/reorder'
import { createEntityAuditsService, EntityAuditsService } from './audits'
import { UUID } from '../../../interfaces/UUID'

interface ShippingMethodsParams extends PaginationParams, MetadataParams {
  country?: string
  cart_value?: { value: string | number; currency: string }
  ids?: UUID[]
}

export interface ShippingMethodsService
  extends Omit<
      CrudService<
        ShippingMethod,
        ShippingMethod,
        ShippingMethodCreateDto,
        ShippingMethodUpdateDto,
        ShippingMethodsParams
      >,
      'getOneBySlug'
    >,
    EntityMetadataService,
    EntityAuditsService<ShippingMethod> {
  getCountries: () => Promise<ShippingCountry[]>
  reorder: ReorderEntityRequest
}

export const createShippingMethodsService: ServiceFactory<ShippingMethodsService> = (axios) => {
  const route = 'shipping-methods'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
    reorder: createReorderPostRequest(axios, route, 'shipping_methods'),

    getCountries: createGetSimpleListRequest(axios, 'countries'),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
