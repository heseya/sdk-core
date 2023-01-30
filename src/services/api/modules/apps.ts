import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { MetadataParams, PaginationParams } from '../types/DefaultParams'
import { App, AppCreateDto } from '../../../interfaces'

type AppsListParams = MetadataParams & PaginationParams

export type AppsService = Omit<
  CrudService<App, App, AppCreateDto, never, AppsListParams>,
  'update' | 'getOneBySlug'
> &
  EntityMetadataService

export const createAppsService: ServiceFactory<AppsService> = (axios) => {
  const route = 'apps'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
