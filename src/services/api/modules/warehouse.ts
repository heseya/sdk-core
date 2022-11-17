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
  WarehouseItemCreateDto,
  WarehouseItemUpdateDto,
  WarehouseDeposit,
  WarehouseDepositDto,
} from '../../../interfaces/WarehouseItem'
import { MetadataParams, PaginationParams, SearchParam } from '../types/DefaultParams'
import {
  CreateEntityRequest,
  DeleteEntityRequest,
  GetEntityRequest,
  GetOneEntityRequest,
  UpdateEntityRequest,
} from '../types/Requests'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { createEntityAuditsService, EntityAuditsService } from './audits'
import { FieldSort } from '../../../interfaces/Sort'

interface WarehouseItemsListParams extends SearchParam, PaginationParams {
  name?: string
  sku?: string
  sort?: string
  sold_out?: boolean
  day?: Date
}

interface WarehouseDepositsListParams extends SearchParam, PaginationParams {
  search?: string
  sku?: string
  /**
   * Sort schemas
   * Use array syntax, string value is deprecated and will be removed in future
   */
  sort?:
    | string
    | Array<FieldSort<'name'> | FieldSort<'sku'> | FieldSort<'quantity'> | FieldSort<'created_at'>>
}

export interface WarehouseService
  extends EntityMetadataService,
    EntityAuditsService<WarehouseItem> {
  /**
   * Return a list of warehouse items
   */
  getItems: GetEntityRequest<WarehouseItem, WarehouseItemsListParams & MetadataParams>

  /**
   * Return a single warehouse item searched by id
   */
  getOneItem: GetOneEntityRequest<WarehouseItem>

  /**
   * Create a new warehouse item
   */
  createItem: CreateEntityRequest<WarehouseItem, WarehouseItemCreateDto>

  /**
   * Update the warehouse item
   */
  updateItem: UpdateEntityRequest<WarehouseItem, WarehouseItemUpdateDto>

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
  getAllDeposits: GetEntityRequest<WarehouseDeposit, WarehouseDepositsListParams>
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
    ...createEntityAuditsService(axios, route),
  }
}
