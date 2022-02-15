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
  AttributeDto,
  AttributeOption,
  AttributeOptionDto,
} from '../../../interfaces/Attribute'
import { UUID } from '../../../interfaces/UUID'
import { HeseyaResponse } from '../../..'

export interface AttributesService
  extends Omit<CrudService<Attribute, Attribute, AttributeDto>, 'getOneBySlug'> {
  addOption(attributeId: UUID, option: AttributeOptionDto): Promise<AttributeOption>
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

    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
