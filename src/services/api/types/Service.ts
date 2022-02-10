import { AxiosInstance } from 'axios'

import { GetEntityRequest, GetOneEntityRequest } from './Requests'

// Universal crud service definition, can be used if we dont want to specify any specific typing behaviours
export interface CrudService<Entity, ListEntity = Entity, EntityDto = Entity> {
  get: GetEntityRequest<ListEntity>
  getOne: GetOneEntityRequest<Entity>
  getOneById: GetOneEntityRequest<Entity>

  // TODO: enable other methods
  // create: CreateEntityRequest<Entity>
  // update: UpdateEntityRequest<Entity>
  // delete: DeleteEntityRequest<Entity>
}

export type ServiceFactory<Service> = (axios: AxiosInstance) => Service
