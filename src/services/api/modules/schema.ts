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
import { Schema, SchemaDto, SchemaList } from '../../../interfaces/Schema'

interface SchemasListParams extends SearchParam, PaginationParams, MetadataParams {
  name?: string
  hidden?: boolean
  required?: boolean
  sort?: string
}

export type SchemasService = Omit<
  CrudService<SchemaList, Schema, SchemaDto, SchemaDto, SchemasListParams>,
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
