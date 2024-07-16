import { CrudService, ServiceFactory } from '../types/Service'
import {
  OrganizationListed,
  OrganizationCreateDto,
  Organization,
  OrganizationUpdateDto,
  OrganizationRegisterDto,
  OrganizationSavedAddressCreateDto,
  OrganizationSavedAddress,
  OrganizationSavedAddressUpdateDto,
} from '../../../interfaces/Organization'
import {
  createDeleteNestedRequest,
  createDeleteRequest,
  createGetListNestedRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchNestedRequest,
  createPatchRequest,
  createPostNestedRequest,
  createPostRequest,
} from '../utils/requests'
import { DefaultParams, PaginationParams } from '../types/DefaultParams'
import {
  CreateEntityRequest,
  CreateNestedEntityRequest,
  DeleteNestedEntityRequest,
  GetNestedEntityRequest,
  GetOneEntityRequest,
  UpdateNestedEntityRequest,
} from '../types/Requests'
import { User } from '../../../interfaces'

type OrganizationListParams = PaginationParams

export interface OrganizationService
  extends Omit<
    CrudService<
      Organization,
      OrganizationListed,
      OrganizationCreateDto,
      OrganizationUpdateDto,
      OrganizationListParams
    >,
    'getOneBySlug'
  > {
  register: CreateEntityRequest<Organization, OrganizationRegisterDto>
  getOneByClientId: GetOneEntityRequest<Organization, DefaultParams>

  Users: {
    get: GetNestedEntityRequest<User[]>
  }

  ShippingAddresses: {
    get: GetNestedEntityRequest<OrganizationSavedAddress[]>
    add: CreateNestedEntityRequest<OrganizationSavedAddress, OrganizationSavedAddressCreateDto>
    update: UpdateNestedEntityRequest<OrganizationSavedAddress, OrganizationSavedAddressUpdateDto>
    delete: DeleteNestedEntityRequest
  }
}

export const createOrganizationService: ServiceFactory<OrganizationService> = (axios) => {
  const route = 'organizations'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    getOneByClientId: createGetOneRequest(axios, route, { byId: false }),
    register: createPostRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    Users: {
      get: createGetListNestedRequest(axios, route, `users`),
    },

    ShippingAddresses: {
      get: createGetListNestedRequest(axios, route, `shipping-addresses`),
      add: createPostNestedRequest(axios, route, `shipping-addresses`),
      update: createPatchNestedRequest(axios, route, `shipping-addresses`),
      delete: createDeleteNestedRequest(axios, route, `shipping-addresses`),
    },
  }
}
