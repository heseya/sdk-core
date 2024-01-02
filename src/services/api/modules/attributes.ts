import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import {
  Attribute,
  AttributeCreateDto,
  AttributeUpdateDto,
  AttributeOption,
  AttributeOptionDto,
} from '../../../interfaces/Attribute'
import { UUID } from '../../../interfaces/UUID'
import { HeseyaResponse } from '../../..'
import { DefaultParams, MetadataParams, PaginationParams } from '../types/DefaultParams'
import { stringifyQueryParams } from '../../../utils/stringifyQueryParams'
import {
  createEntityMetadataService,
  createUpdateMetadataRequest,
  EntityMetadataService,
  MetadataType,
} from './metadata'
import { Metadata, MetadataUpdateDto } from '../../../interfaces/Metadata'
import { HeseyaPaginatedResponse, LanguageParams, ListResponse } from '../../../interfaces'
import { normalizePagination } from '../utils/normalizePagination'
import { createReorderPostRequest } from '../utils/reorder'
import { ReorderEntityRequest } from '../types/Reorder'

type AttributeParams = PaginationParams & MetadataParams & { ids?: UUID[] } & LanguageParams

export interface AttributesService
  extends Omit<
      CrudService<Attribute, Attribute, AttributeCreateDto, AttributeUpdateDto, AttributeParams>,
      'getOneBySlug'
    >,
    EntityMetadataService {
  getOptions(
    attributeId: UUID,
    params?: MetadataParams &
      PaginationParams & {
        name?: string
        ids?: UUID[]
        product_set_slug?: UUID
        /**
         * If empty, it will be sorted by position
         * If value is provided, it will be sorted asc/desc by name (in option attributes) or by value (in number/date attributes)
         */
        sort?: 'asc' | 'desc'
      } & LanguageParams,
  ): Promise<ListResponse<AttributeOption>>
  addOption(
    attributeId: UUID,
    option: AttributeOptionDto,
    params?: LanguageParams,
  ): Promise<AttributeOption>
  updateOption(
    attributeId: UUID,
    optionId: UUID,
    option: AttributeOptionDto,
    params?: LanguageParams,
  ): Promise<AttributeOption>

  updateOptionMetadata(
    attributeId: UUID,
    optionId: UUID,
    metadata: MetadataUpdateDto,
    params?: LanguageParams,
  ): Promise<Metadata>
  updateOptionMetadataPrivate(
    attributeId: UUID,
    optionId: UUID,
    metadata: MetadataUpdateDto,
    params?: LanguageParams,
  ): Promise<Metadata>

  deleteOption(attributeId: UUID, optionId: UUID): Promise<true>

  reorder: ReorderEntityRequest
  reorderOptions: (attributeId: UUID, optionIds: UUID[], params?: DefaultParams) => Promise<true>
}

export const createAttributesService: ServiceFactory<AttributesService> = (axios) => {
  const route = 'attributes'
  return {
    async getOptions(attributeId, params) {
      const stringParams = stringifyQueryParams(params || {})
      const response = await axios.get<HeseyaPaginatedResponse<AttributeOption[]>>(
        `/attributes/id:${attributeId}/options?${stringParams}`,
      )
      const { data, meta } = response.data

      return { data, pagination: normalizePagination(meta) }
    },

    async addOption(attributeId, option, params) {
      const stringParams = stringifyQueryParams(params || {})
      const { data } = await axios.post<HeseyaResponse<AttributeOption>>(
        `/attributes/id:${attributeId}/options?${stringParams}`,
        option,
      )
      return data.data
    },

    async updateOption(attributeId, optionId, option, params) {
      const stringParams = stringifyQueryParams(params || {})
      const { data } = await axios.patch<HeseyaResponse<AttributeOption>>(
        `/attributes/id:${attributeId}/options/id:${optionId}?${stringParams}`,
        option,
      )
      return data.data
    },

    async deleteOption(attributeId, optionId) {
      await axios.delete<HeseyaResponse<void>>(
        `/attributes/id:${attributeId}/options/id:${optionId}`,
      )
      return true
    },

    async reorderOptions(attributeId, optionIds, params) {
      const stringParams = stringifyQueryParams(params || {})

      await axios.post(`/${route}/id:${attributeId}/options/reorder?${stringParams}`, {
        ids: optionIds,
      })

      return true
    },

    async updateOptionMetadata(attributeId, optionId, metadata) {
      return await createUpdateMetadataRequest(
        axios,
        `${route}/id:${attributeId}/options`,
        MetadataType.Public,
      )(optionId, metadata)
    },

    async updateOptionMetadataPrivate(attributeId, optionId, metadata) {
      return await createUpdateMetadataRequest(
        axios,
        `${route}/id:${attributeId}/options`,
        MetadataType.Private,
      )(optionId, metadata)
    },

    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
    reorder: createReorderPostRequest(axios, route, 'ids'),

    ...createEntityMetadataService(axios, route),
  }
}
