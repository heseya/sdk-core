import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { Consent, ConsentCreateDto, ConsentUpdateDto } from '../../../interfaces/Consent'
import { MetadataParams, PaginationParams } from '../types/DefaultParams'

type ConsentsListParams = PaginationParams & MetadataParams

export type ConsentsService = Omit<
  CrudService<Consent, Consent, ConsentCreateDto, ConsentUpdateDto, ConsentsListParams>,
  'getOneBySlug' | 'getOne'
>

export const createConsentsService: ServiceFactory<ConsentsService> = (axios) => {
  const route = 'consents'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
