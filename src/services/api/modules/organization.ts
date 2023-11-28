import { CrudService, ServiceFactory } from '../types/Service'
import {
  OrganizationBase,
  OrganizationCreateDto,
  OrganizationDetail,
  OrganizationStatus,
  OrganizationUpdateDto,
} from '../../../interfaces/Organization'
import { PaginationParams } from '../types/DefaultParams'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'
import { HeseyaResponse } from '../../../interfaces'

interface OrganizationListParams extends PaginationParams {
  status?: OrganizationStatus
}

export interface OrganizationService
  extends Omit<
    CrudService<
      OrganizationDetail,
      OrganizationBase,
      OrganizationCreateDto,
      OrganizationUpdateDto,
      OrganizationListParams
    >,
    'getOneBySlug'
  > {
  accept(
    organizationId: string,
    redirectUrl: string,
    salesChannelId?: string,
  ): Promise<OrganizationDetail>
  reject(organizationId: string): Promise<OrganizationDetail>
  invite(organizationId: string, redirectUrl: string, emails: string[]): Promise<true>
}

export const createOrganizationService: ServiceFactory<OrganizationService> = (axios) => {
  const route = 'organizations'
  return {
    async accept(organizationId: string, redirectUrl: string, salesChannelId?: string) {
      const {
        data: { data },
      } = await axios.post<HeseyaResponse<OrganizationDetail>>(
        `${route}/id:${organizationId}/accept`,
        {
          redirect_url: redirectUrl,
          sales_channel_id: salesChannelId,
        },
      )

      return data
    },

    async reject(organizationId: string) {
      const {
        data: { data },
      } = await axios.post<HeseyaResponse<OrganizationDetail>>(
        `${route}/id:${organizationId}/reject`,
      )

      return data
    },

    async invite(organizationId: string, redirectUrl: string, emails: string[]) {
      await axios.post<HeseyaResponse<OrganizationDetail>>(`${route}/id:${organizationId}/invite`, {
        redirect_url: redirectUrl,
        emails: emails,
      })
      return true
    },

    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
