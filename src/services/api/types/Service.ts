import { AxiosInstance } from 'axios'
import { DefaultParams } from './DefaultParams'

import {
  CreateEntityRequest,
  DeleteEntityRequest,
  GetEntityRequest,
  getOneEntityRequest,
  getOneBySlugEntityRequest,
  UpdateEntityRequest,
} from './Requests'

/**
 * Universal crud service definition, can be used if we dont want to specify any specific typing behaviours
 *
 * Don't allow to type query params for other methods than GET
 */
export interface CrudService<
  Entity,
  ListEntity = Entity,
  EntityDto = Entity,
  GetParams = DefaultParams,
> {
  get: GetEntityRequest<ListEntity, GetParams>
  getOneBySlug: getOneBySlugEntityRequest<Entity>
  getOne: getOneEntityRequest<Entity>
  create: CreateEntityRequest<EntityDto, Entity>
  update: UpdateEntityRequest<EntityDto, Entity>
  delete: DeleteEntityRequest
}

export type ServiceFactory<Service> = (axios: AxiosInstance) => Service
