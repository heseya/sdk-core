import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { WarehouseItem, WarehouseItemDto } from '../../../interfaces/WarehouseItem'
import { SearchParam } from '../types/DefaultParams'

interface WarehouseItemsListParams extends SearchParam {
  name?: string
  sku?: string
  sort?: string
  sold_out?: boolean
  day?: Date // TODO: write tests to date type in query params
}

export type WarehouseItemsService = Omit<
  CrudService<WarehouseItem, WarehouseItem, WarehouseItemDto, WarehouseItemsListParams>,
  'getOneBySlug'
>

export const createWarehouseItemsService: ServiceFactory<WarehouseItemsService> = (axios) => {
  const route = 'items'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
