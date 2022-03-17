import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { PaginationParams } from '../types/DefaultParams'
import { OrderStatus, OrderStatusDto } from '../../../interfaces/OrderStatus'

export type OrderStatusesService = Omit<
  CrudService<OrderStatus, OrderStatus, OrderStatusDto, PaginationParams>,
  'getOneBySlug' | 'getOne'
> &
  EntityMetadataService

export const createOrderStatusesService: ServiceFactory<OrderStatusesService> = (axios) => {
  const route = 'statuses'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
