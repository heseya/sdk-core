import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { Page, PageDto, ListPage } from '../../../interfaces/Page'

export type PagesService = CrudService<Page, ListPage, PageDto>

export const createPagesService: ServiceFactory<PagesService> = (axios) => {
  const route = 'pages'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route),
    getOneById: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
