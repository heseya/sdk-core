import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { MetadataParams, PaginationParams } from '../types/DefaultParams'
import {
  PackagesTemplate,
  PackagesTemplateCreateDto,
  PackagesTemplateUpdateDto,
} from '../../../interfaces/PackagesTemplate'

type PackagesTemplatesListParams = PaginationParams & MetadataParams

export type PackagesTemplatesService = Omit<
  CrudService<
    PackagesTemplate,
    PackagesTemplate,
    PackagesTemplateCreateDto,
    PackagesTemplateUpdateDto,
    PackagesTemplatesListParams
  >,
  'getOneBySlug' | 'getOne'
> &
  EntityMetadataService

export const createPackagesTemplatesService: ServiceFactory<PackagesTemplatesService> = (axios) => {
  const route = 'apps'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    delete: createDeleteRequest(axios, route),
    update: createPatchRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
