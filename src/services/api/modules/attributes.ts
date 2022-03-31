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
import { PaginationParams } from '../types/DefaultParams'

export interface AttributesService
  extends Omit<
    CrudService<Attribute, Attribute, AttributeCreateDto, AttributeUpdateDto, PaginationParams>,
    'getOneBySlug'
  > {
  addOption(attributeId: UUID, option: AttributeOptionDto): Promise<AttributeOption>
  updateOption(
    attributeId: UUID,
    optionId: UUID,
    option: AttributeOptionDto,
  ): Promise<AttributeOption>
  deleteOption(attributeId: UUID, optionId: UUID): Promise<true>
}

export const createAttributesService: ServiceFactory<AttributesService> = (axios) => {
  const route = 'attributes'
  return {
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

    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
