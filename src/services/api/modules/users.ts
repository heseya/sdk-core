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
import {
  createEntityMetadataService,
  createUpdateMetadataRequest,
  EntityMetadataService,
  MetadataType,
} from './metadata'
import { UserCreateDto, UserUpdateDto, User, UserListed } from '../../../interfaces/User'
import { HeseyaResponse, ListResponse, Metadata, MetadataUpdateDto } from '../../../interfaces'
import { UUID } from '../../../interfaces/UUID'
import { FieldSort } from '../../../interfaces/Sort'

interface UsersListParams extends SearchParam, PaginationParams, MetadataParams {
  name?: string
  /**
   * Sort users
   * Use array syntax, string value is deprecated and will be removed in future
   */
  sort?: string | Array<FieldSort<'name'> | FieldSort<'created_at'>>
  roles?: UUID[]
  ids?: UUID[]
}

export interface UsersService extends EntityMetadataService {
  /**
   * Return a list of users
   */
  get(params: UsersListParams & { full?: false }): Promise<ListResponse<UserListed>>
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

  /**
   * Delete user (user can delete only himself)
   */
  deleteSelf: (password: string) => Promise<true>

  /**
   * Removes two factor authentication for the user
   */
  removeTwoFactorAuth: (userId: string) => Promise<User>

  /**
   * Allows to update personal metadata of an entity.
   */
  updateMetadataPersonal: (entityId: UUID, metadata: MetadataUpdateDto) => Promise<Metadata>
}

export const createUsersService: ServiceFactory<UsersService> = (axios) => {
  const route = 'users'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    removeTwoFactorAuth: async (userId: string) => {
      const { data } = await axios.post<HeseyaResponse<User>>(`/users/id:${userId}/2fa/remove`)
      return data.data
    },

    deleteSelf: async (password: string) => {
      await axios.post(`/users/self-remove`, { password })
      return true
    },

    updateMetadataPersonal: createUpdateMetadataRequest(axios, route, MetadataType.Personal),
    ...createEntityMetadataService(axios, route),
  }
}
