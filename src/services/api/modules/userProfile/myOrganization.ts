import { ServiceFactory } from '../../types/Service'
import { Order, OrderListed } from '../../../../interfaces/Order'

import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../../utils/requests'
import { MyOrdersService } from './my'
import {
  CreateEntityRequest,
  DeleteEntityRequest,
  GetEntityRequest,
  UpdateEntityRequest,
} from '../../types/Requests'
import {
  Organization,
  OrganizationPublicUpdateDto,
  OrganizationSavedAddress,
  OrganizationSavedAddressCreateDto,
  OrganizationSavedAddressUpdateDto,
} from '../../../../interfaces'

export interface UserMyOrganizationService {
  get: () => Promise<Organization>
  update: (payload: OrganizationPublicUpdateDto) => Promise<Organization>

  ShippingAddresses: {
    get: GetEntityRequest<OrganizationSavedAddress>
    create: CreateEntityRequest<OrganizationSavedAddress[], OrganizationSavedAddressCreateDto>
    update: UpdateEntityRequest<OrganizationSavedAddress[], OrganizationSavedAddressUpdateDto>
    remove: DeleteEntityRequest
  }

  Orders: MyOrdersService
}

export const createUserMyOrganizationService: ServiceFactory<UserMyOrganizationService> = (
  axios,
) => ({
  get: async () => {
    const { data } = await axios.get(`/my/organization`)
    return data.data
  },
  update: async (payload) => {
    const { data } = await axios.patch(`/my/organization`, payload)
    return data.data
  },

  ShippingAddresses: {
    get: createGetListRequest(axios, '/my/organization/shipping-addresses'),
    create: createPostRequest(axios, '/my/organization/shipping-addresses'),
    update: createPatchRequest(axios, '/my/organization/shipping-addresses'),
    remove: createDeleteRequest(axios, '/my/organization/shipping-addresses'),
  },

  Orders: {
    get: createGetListRequest<OrderListed>(axios, 'my/organization/orders'),
    getOneByCode: createGetOneRequest<Order>(axios, 'my/organization/orders'),
  },
})
