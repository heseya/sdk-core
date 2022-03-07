import { AxiosInstance } from 'axios'
import { DefaultParams } from './DefaultParams'

import {
  CreateEntityRequest,
  DeleteEntityRequest,
  GetEntityRequest,
  GetOneEntityRequest,
  GetOneBySlugEntityRequest,
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
  /**
   * Return a list of entities
   */
  get: GetEntityRequest<ListEntity, GetParams>

  /**
   * Return a single entity searched by slug
   */
  getOneBySlug: GetOneBySlugEntityRequest<Entity>

  /**
   * Return a single entity searched by id
   */
  getOne: GetOneEntityRequest<Entity>

  /**
   * Create a new entity
   */
  create: CreateEntityRequest<Entity, EntityDto>

  /**
   * Update the entity
   */
  update: UpdateEntityRequest<Entity, EntityDto>

  /**
   * Delete the entity
   */
  delete: DeleteEntityRequest
}

export type ServiceFactory<Service> = (axios: AxiosInstance) => Service
