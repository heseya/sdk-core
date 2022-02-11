import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  creategetOneBySlugRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { Page, PageDto, ListPage } from '../../../interfaces/Page'

export type PagesService = CrudService<Page, ListPage, PageDto>

export const createPagesService: ServiceFactory<PagesService> = (axios) => {
  const route = 'pages'
  return {
    get: createGetListRequest(axios, route),
    getOneBySlug: creategetOneBySlugRequest(axios, route),
    getOne: creategetOneBySlugRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
