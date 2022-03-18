import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { Page, PageDto, PageList } from '../../../interfaces/Page'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { PaginationParams } from '../types/DefaultParams'
import { ReorderEntityRequest } from '../types/Reorder'
import { createReorderPostRequest } from '../utils/reorder'
import { createEntityAuditsService, EntityAuditsService } from './audits'

export interface PagesService
  extends CrudService<Page, PageList, PageDto, PaginationParams>,
    EntityMetadataService,
    EntityAuditsService<Page> {
  reorder: ReorderEntityRequest
}

export const createPagesService: ServiceFactory<PagesService> = (axios) => {
  const route = 'pages'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: createGetOneRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
    reorder: createReorderPostRequest(axios, route, 'pages'),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
