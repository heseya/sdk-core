import { CrudService, ServiceFactory } from '../types/Service'
import { createGetListRequest, createGetOneRequest } from '../utils/requests'

import { Page, ListPage } from '../../../interfaces/Page'

export type PagesService = CrudService<Page, ListPage>

export const createPagesService: ServiceFactory<PagesService> = (axios) => {
  const route = 'pages'
  return {
    getOne: createGetOneRequest<Page>(axios, route),
    getOneById: createGetOneRequest<Page>(axios, route, { byId: true }),
    get: createGetListRequest<ListPage>(axios, route),
  }
}
