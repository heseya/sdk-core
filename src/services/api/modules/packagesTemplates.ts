import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { PaginationParams } from '../types/DefaultParams'
import { PackagesTemplate, PackagesTemplateDto } from '../../../interfaces/PackagesTemplate'

export type PackagesTemplatesService = Omit<
  CrudService<PackagesTemplate, PackagesTemplate, PackagesTemplateDto, PaginationParams>,
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
