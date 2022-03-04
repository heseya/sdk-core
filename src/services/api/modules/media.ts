import FormData from 'form-data'
import fs from 'fs'

import { CdnMedia, CdnMediaUpdateDto } from '../../../interfaces/CdnMedia'
import { DeleteEntityRequest, UpdateEntityRequest } from '../types/Requests'
import { ServiceFactory } from '../types/Service'
import { createDeleteRequest, createPatchRequest } from '../utils/requests'

export interface MediaService {
  /**
   * Allows a user to create the Media.
   */
  create: (file: File | Buffer | fs.ReadStream) => Promise<CdnMedia>
  /**
   * Allows a user to create the Media.
   */
  update: UpdateEntityRequest<CdnMediaUpdateDto, CdnMedia>
  /**
   * Allows a user to create the Media.
   */
  delete: DeleteEntityRequest
}

export const createMediaService: ServiceFactory<MediaService> = (axios) => {
  const route = '/media'
  return {
    async create(file) {
      const form = new FormData()
      form.append('file', file)

      const { data } = await axios.post<{ data: CdnMedia }>(route, form)

      return data.data
    },
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
