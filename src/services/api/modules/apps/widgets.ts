import { CrudService, ServiceFactory } from '../../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../../utils/requests'

import { AppWidget, AppWidgetCreateDto, AppWidgetUpdateDto } from '../../../../interfaces/AppWidget'
import { MetadataParams, PaginationParams } from '../../types/DefaultParams'

interface AppWidgetsListParams extends PaginationParams, MetadataParams, PaginationParams {
  section?: string
}

export type AppWidgetsService = Omit<
  CrudService<AppWidget, AppWidget, AppWidgetCreateDto, AppWidgetUpdateDto, AppWidgetsListParams>,
  'getOne' | 'getOneBySlug'
>

export const createAppWidgetsService: ServiceFactory<AppWidgetsService> = (axios) => {
  const route = 'apps/widgets'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
