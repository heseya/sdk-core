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
  Language,
  LanguageCreateDto,
  LanguageUpdateDto,
} from '../../../interfaces/languages/Language'
import { createEntityAuditsService, EntityAuditsService } from './audits'
import { UUID } from '../../../interfaces/UUID'

type LanguagesListParams = MetadataParams & PaginationParams & { ids?: UUID[] }

export interface LanguagesService
  extends Omit<
      CrudService<Language, Language, LanguageCreateDto, LanguageUpdateDto, LanguagesListParams>,
      'getOneBySlug' | 'getOne'
    >,
    EntityMetadataService,
    EntityAuditsService<Language> {}

export const createLanguagesService: ServiceFactory<LanguagesService> = (axios) => {
  const route = 'languages'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
