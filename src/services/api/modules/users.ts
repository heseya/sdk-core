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
  GetOneEntityRequest,
  UpdateEntityRequest,
} from '../types/Requests'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { UserCreateDto, UserUpdateDto, User, UserList } from '../../../interfaces/User'
import { createEntityAuditsService, EntityAuditsService } from './audits'
import { ListResponse } from '../../../interfaces'

interface UsersListParams extends SearchParam, PaginationParams, MetadataParams {
  name?: string
  sort?: string
}

export interface UsersService extends EntityMetadataService, EntityAuditsService<User> {
  /**
   * Return a list of users
   */
  get(params: UsersListParams & { full?: false }): Promise<ListResponse<UserList>>
  get(params: UsersListParams & { full: true }): Promise<ListResponse<User>>

  /**
   * Return a single user searched by id
   */
  getOne: GetOneEntityRequest<User>

  /**
   * Create a new user
   */
  create: CreateEntityRequest<User, UserCreateDto>

  /**
   * Update the user
   */
  update: UpdateEntityRequest<User, UserUpdateDto>

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