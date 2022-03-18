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
import { PaginationParams } from '../types/DefaultParams'
import {
  ShippingCountry,
  ShippingMethod,
  ShippingMethodDto,
} from '../../../interfaces/ShippingMethod'
import { ReorderEntityRequest } from '../types/Reorder'
import { createReorderPostRequest } from '../utils/reorder'
import { createEntityAuditsService, EntityAuditsService } from './audits'

interface ShippingMethodsParams extends PaginationParams {
  country?: string
  cart_value?: number
}

export interface ShippingMethodsService
  extends Omit<
      CrudService<ShippingMethod, ShippingMethod, ShippingMethodDto, ShippingMethodsParams>,
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
