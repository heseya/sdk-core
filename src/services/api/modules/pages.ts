import { CrudService, ServiceFactory } from '../types/Service'
import { getApiCall, getOneApiCall } from '../utils/calls'

import { Page, ListPage } from '../../../interfaces/Page'

export type PagesService = CrudService<Page, ListPage>

export const createPagesService: ServiceFactory<PagesService> = (axios) => ({
  getOne: getOneApiCall<Page>(axios, 'pages'),
  get: getApiCall<ListPage>(axios, 'pages'),
})
