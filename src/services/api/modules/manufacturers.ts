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
import { UUID } from '../../../interfaces/UUID'
import { Manufacturer, ManufacturerDto, ManufacturerListed } from '../../../interfaces'

interface ManufacturersListParams extends SearchParam, PaginationParams, MetadataParams {
  search?: string
  email?: string
  name?: string
  ids?: UUID[]
}

export type ManufacturersService = CrudService<
  Manufacturer,
  ManufacturerListed,
  ManufacturerDto,
  ManufacturerDto,
  ManufacturersListParams
> &
  EntityMetadataService

export const createManufacturersService: ServiceFactory<ManufacturersService> = (axios) => {
  const route = 'manufacturers'
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
