import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { MetadataParams, PaginationParams, SearchParam } from '../types/DefaultParams'
import { Schema, SchemaCreateDto, SchemaUpdateDto, SchemaListed } from '../../../interfaces/Schema'
import { FieldSort } from '../../../interfaces/Sort'
import { UUID } from '../../../interfaces/UUID'
import { LanguageParams } from '../../../interfaces'

interface SchemasListParams extends SearchParam, PaginationParams, LanguageParams, MetadataParams {
  name?: string
  hidden?: boolean
  required?: boolean
  /**
   * Sort schemas
   * Use array syntax, string value is deprecated and will be removed in future
   * TODO: specify by which field to sort
   */
  sort?: string | Array<FieldSort<string>>
  ids?: UUID[]
  has_product?: boolean
}

export type SchemasService = Omit<
  CrudService<Schema, SchemaListed, SchemaCreateDto, SchemaUpdateDto, SchemasListParams>,
  'getOneBySlug'
> &
  EntityMetadataService

export const createSchemasService: ServiceFactory<SchemasService> = (axios) => {
  const route = 'schemas'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
