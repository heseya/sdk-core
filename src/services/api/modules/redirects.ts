import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { MetadataParams, PaginationParams } from '../types/DefaultParams'
import { Redirect, RedirectCreateDto, RedirectUpdateDto } from '../../../interfaces'

type RedirectsListParams = MetadataParams & PaginationParams & { enabled?: boolean }

export type RedirectsService = Omit<
  CrudService<Redirect, Redirect, RedirectCreateDto, RedirectUpdateDto, RedirectsListParams>,
  'getOne' | 'getOneBySlug'
>

export const createRedirectsService: ServiceFactory<RedirectsService> = (axios) => {
  const route = 'redirects'
  return {
    get: createGetListRequest(axios, route),
    update: createPatchRequest(axios, route),
    create: createPostRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
