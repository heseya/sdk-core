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
import { MetadataParams, PaginationParams } from '../types/DefaultParams'
import { stringifyQueryParams } from '../../../utils/stringifyQueryParams'
import {
  createEntityMetadataService,
  createUpdateMetadataRequest,
  EntityMetadataService,
  MetadataType,
} from './metadata'
import { Metadata, MetadataUpdateDto } from '../../../interfaces/Metadata'
import { HeseyaPaginatedResponse, ListResponse } from '../../../interfaces'
import { normalizePagination } from '../utils/normalizePagination'

type AttributeParams = PaginationParams & MetadataParams & { ids?: UUID[] }

export interface AttributesService
  extends Omit<
      CrudService<Attribute, Attribute, AttributeCreateDto, AttributeUpdateDto, AttributeParams>,
      'getOneBySlug'
    >,
    EntityMetadataService {
  getOptions(
    attributeId: UUID,
    params?: MetadataParams & { name?: string; ids?: UUID[] },
  ): Promise<ListResponse<AttributeOption>>
  addOption(attributeId: UUID, option: AttributeOptionDto): Promise<AttributeOption>
  updateOption(
    attributeId: UUID,
    optionId: UUID,
    option: AttributeOptionDto,
  ): Promise<AttributeOption>

  updateOptionMetadata(
    attributeId: UUID,
    optionId: UUID,
    metadata: MetadataUpdateDto,
  ): Promise<Metadata>
  updateOptionMetadataPrivate(
    attributeId: UUID,
    optionId: UUID,
    metadata: MetadataUpdateDto,
  ): Promise<Metadata>

  deleteOption(attributeId: UUID, optionId: UUID): Promise<true>
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

    async addOption(attributeId, option) {
      const { data } = await axios.post<HeseyaResponse<AttributeOption>>(
        `/attributes/id:${attributeId}/options`,
        option,
      )
      return data.data
    },

    async updateOption(attributeId, optionId, option) {
      const { data } = await axios.patch<HeseyaResponse<AttributeOption>>(
        `/attributes/id:${attributeId}/options/id:${optionId}`,
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

    ...createEntityMetadataService(axios, route),
  }
}
