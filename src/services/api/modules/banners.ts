import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { Banner, BannerCreateDto, BannerUpdateDto } from '../../../interfaces/Banner'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { MetadataParams, PaginationParams } from '../types/DefaultParams'

interface BannersListParams extends PaginationParams, MetadataParams, PaginationParams {
  slug?: string
}

export type BannersService = CrudService<
  Banner,
  Banner,
  BannerCreateDto,
  BannerUpdateDto,
  BannersListParams
> &
  EntityMetadataService

export const createBannersService: ServiceFactory<BannersService> = (axios) => {
  const route = 'banners'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    getOneBySlug: createGetOneRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
