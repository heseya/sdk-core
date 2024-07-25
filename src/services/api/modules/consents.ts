import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import {
  Consent,
  ConsentCreateDto,
  ConsentType,
  ConsentUpdateDto,
} from '../../../interfaces/Consent'
import { MetadataParams, PaginationParams } from '../types/DefaultParams'
import { LanguageParams } from '../../../interfaces'

type ConsentsListParams = PaginationParams &
  MetadataParams &
  LanguageParams & {
    type?: ConsentType
  }

export type ConsentsService = Omit<
  CrudService<Consent, Consent, ConsentCreateDto, ConsentUpdateDto, ConsentsListParams>,
  'getOneBySlug'
>

export const createConsentsService: ServiceFactory<ConsentsService> = (axios) => {
  const route = 'consents'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
