import { AxiosInstance } from 'axios'

import {
  CreateEntityRequest,
  DeleteEntityRequest,
  GetEntityRequest,
  GetOneEntityRequest,
  UpdateEntityRequest,
} from './Requests'

/**
 * Universal crud service definition, can be used if we dont want to specify any specific typing behaviours
 *
 * Don't allow to type query params
 */
export interface CrudService<Entity, ListEntity = Entity, EntityDto = Entity> {
  get: GetEntityRequest<ListEntity>
  getOne: GetOneEntityRequest<Entity>
  getOneById: GetOneEntityRequest<Entity>

  create: CreateEntityRequest<EntityDto, Entity>
  update: UpdateEntityRequest<EntityDto, Entity>
  delete: DeleteEntityRequest
}

export type ServiceFactory<Service> = (axios: AxiosInstance) => Service
