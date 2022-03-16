import { ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPostNestedRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import {
  WarehouseItem,
  WarehouseItemDto,
  WarehouseDeposit,
  WarehouseDepositDto,
} from '../../../interfaces/WarehouseItem'
import { SearchParam } from '../types/DefaultParams'
import {
  CreateEntityRequest,
  DeleteEntityRequest,
  GetEntityRequest,
  GetOneEntityRequest,
  UpdateEntityRequest,
} from '../types/Requests'
import { createEntityMetadataService, EntityMetadataService } from './metadata'

interface WarehouseItemsListParams extends SearchParam {
  name?: string
  sku?: string
  sort?: string
  sold_out?: boolean
  day?: Date
}

export interface WarehouseService extends EntityMetadataService {
  /**
   * Return a list of warehouse items
   */
  getItems: GetEntityRequest<WarehouseItem, WarehouseItemsListParams>

  /**
   * Return a single warehouse item searched by id
   */
  getOneItem: GetOneEntityRequest<WarehouseItem>

  /**
   * Create a new warehouse item
   */
  createItem: CreateEntityRequest<WarehouseItem, WarehouseItemDto>

  /**
   * Update the warehouse item
   */
  updateItem: UpdateEntityRequest<WarehouseItem, WarehouseItemDto>

  /**
   * Delete the warehouse item
   */
  deleteItem: DeleteEntityRequest

  /**
   * Return a list of warehouse deposits of the given item
   */
  getItemDeposits: GetOneEntityRequest<WarehouseDeposit[]>

  /**
   * Create a new warehouse deposit of the given item
   */
  createDeposit: UpdateEntityRequest<WarehouseDeposit, WarehouseDepositDto>

  /**
   * Returns all deposites
   */
  getAllDeposits: GetEntityRequest<WarehouseDeposit>
}

export const createWarehouseService: ServiceFactory<WarehouseService> = (axios) => {
  const route = 'items'
  return {
    getItems: createGetListRequest(axios, route),
    getOneItem: createGetOneRequest(axios, route, { byId: true }),
    createItem: createPostRequest(axios, route),
    updateItem: createPatchRequest(axios, route),
    deleteItem: createDeleteRequest(axios, route),

    getAllDeposits: createGetListRequest(axios, 'deposits'),
    getItemDeposits: createGetOneRequest(axios, route, { byId: true }, 'deposits'),
    createDeposit: createPostNestedRequest(axios, route, 'deposits'),

    ...createEntityMetadataService(axios, route),
  }
}
