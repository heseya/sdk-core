import { ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { MetadataParams, PaginationParams, SearchParam } from '../types/DefaultParams'
import {
  CreateEntityRequest,
  DeleteEntityRequest,
  GetEntityRequest,
  GetOneEntityRequest,
  UpdateEntityRequest,
} from '../types/Requests'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { CreateUserDto, UpdateUserDto, User, UserList } from '../../../interfaces/User'
import { createEntityAuditsService, EntityAuditsService } from './audits'

interface UsersListParams extends SearchParam, PaginationParams, MetadataParams {
  name?: string
  sort?: string
}

export interface UsersService extends EntityMetadataService, EntityAuditsService<User> {
  /**
   * Return a list of users
   */
  get: GetEntityRequest<UserList, UsersListParams>

  /**
   * Return a single user searched by id
   */
  getOne: GetOneEntityRequest<User>

  /**
   * Create a new user
   */
  create: CreateEntityRequest<User, CreateUserDto>

  /**
   * Update the user
   */
  update: UpdateEntityRequest<User, UpdateUserDto>

  /**
   * Delete the user
   */
  delete: DeleteEntityRequest
}

export const createUsersService: ServiceFactory<UsersService> = (axios) => {
  const route = 'users'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
