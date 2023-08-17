import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import {
  SalesChannel,
  SalesChannelCreateDto,
  SalesChannelUpdateDto,
} from '../../../interfaces/SalesChannel'
import { PaginationParams } from '../types/DefaultParams'
import { LanguageParams } from '../../../interfaces'

type SalesChannelsListParams = PaginationParams & LanguageParams

export type SalesChannelsService = Omit<
  CrudService<
    SalesChannel,
    SalesChannel,
    SalesChannelCreateDto,
    SalesChannelUpdateDto,
    SalesChannelsListParams
  >,
  'getOneBySlug'
>

export const createSalesChannelsService: ServiceFactory<SalesChannelsService> = (axios) => {
  const route = 'sales-channel'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
