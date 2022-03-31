import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { PaginationParams } from '../types/DefaultParams'
import { Tag, TagDto } from '../../../interfaces/Tag'

export type TagsService = Omit<
  CrudService<Tag, Tag, TagDto, TagDto, PaginationParams>,
  'getOneBySlug' | 'getOne'
>

export const createTagsService: ServiceFactory<TagsService> = (axios) => {
  const route = 'tags'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    delete: createDeleteRequest(axios, route),
    update: createPatchRequest(axios, route),
  }
}
