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
import { UUID } from '../../../interfaces/UUID'

type PackagesTemplatesListParams = PaginationParams & MetadataParams & { ids?: UUID[] }

/**
 * @deprecated Package templates will be removed in 6.0 release
 */
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
    /**
     * @deprecated Package templates will be removed in 6.0 release
     */
    get: createGetListRequest(axios, route),
    /**
     * @deprecated Package templates will be removed in 6.0 release
     */
    create: createPostRequest(axios, route),
    /**
     * @deprecated Package templates will be removed in 6.0 release
     */
    delete: createDeleteRequest(axios, route),
    /**
     * @deprecated Package templates will be removed in 6.0 release
     */
    update: createPatchRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
