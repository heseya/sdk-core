import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createGetSimpleListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { MetadataParams, PaginationParams } from '../types/DefaultParams'
import { Role, RoleDto } from '../../../interfaces/Role'
import { PermissionEntry } from '../../../interfaces'
import { createEntityAuditsService, EntityAuditsService } from './audits'

type RolesListParams = PaginationParams & MetadataParams

export interface RolesService
  extends Omit<CrudService<Role, Role, RoleDto, RoleDto, RolesListParams>, 'getOneBySlug'>,
    EntityMetadataService,
    EntityAuditsService<Role> {
  getPermissions: (params: { assignable?: boolean }) => Promise<PermissionEntry[]>
}

export const createRolesService: ServiceFactory<RolesService> = (axios) => {
  const route = 'roles'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    getPermissions: createGetSimpleListRequest(axios, 'permissions'),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
