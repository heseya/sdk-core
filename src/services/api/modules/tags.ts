import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { PaginationParams } from '../types/DefaultParams'
import { Tag, TagCreateDto, TagUpdateDto } from '../../../interfaces/Tag'
import { UUID } from '../../../interfaces/UUID'
import { LanguageParams } from '../../../interfaces'

type TagsListParams = PaginationParams & LanguageParams & { ids?: UUID[] }

export type TagsService = Omit<
  CrudService<Tag, Tag, TagCreateDto, TagUpdateDto, TagsListParams>,
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
