import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { MetadataParams, PaginationParams } from '../types/DefaultParams'
import {
  OrderStatus,
  OrderStatusCreateDto,
  OrderStatusUpdateDto,
} from '../../../interfaces/OrderStatus'
import { createReorderPostRequest } from '../utils/reorder'
import { ReorderEntityRequest } from '../types/Reorder'
import { createEntityAuditsService, EntityAuditsService } from './audits'
import { UUID } from '../../../interfaces/UUID'
import { LanguageParams } from '../../../interfaces'

type OrderStatusesListParams = MetadataParams & PaginationParams & LanguageParams & { ids?: UUID[] }

export interface OrderStatusesService
  extends Omit<
      CrudService<
        OrderStatus,
        OrderStatus,
        OrderStatusCreateDto,
        OrderStatusUpdateDto,
        OrderStatusesListParams
      >,
      'getOneBySlug' | 'getOne'
    >,
    EntityMetadataService,
    EntityAuditsService<OrderStatus> {
  reorder: ReorderEntityRequest
}

export const createOrderStatusesService: ServiceFactory<OrderStatusesService> = (axios) => {
  const route = 'statuses'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
    reorder: createReorderPostRequest(axios, route, 'statuses'),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
