import { CdnMedia, CdnMediaUpdateDto } from '../../../interfaces/CdnMedia'
import { DeleteEntityRequest, UpdateEntityRequest } from '../types/Requests'
import { ServiceFactory } from '../types/Service'
import { createDeleteRequest, createPatchRequest } from '../utils/requests'
import { createEntityMetadataService, EntityMetadataService } from './metadata'

export interface MediaService extends EntityMetadataService {
  /**
   * Allows a user to create the Media.
   */
  create: (file: File) => Promise<CdnMedia>
  /**
   * Allows a user to create the Media.
   */
  update: UpdateEntityRequest<CdnMedia, CdnMediaUpdateDto>
  /**
   * Allows a user to create the Media.
   */
  delete: DeleteEntityRequest
}

export const createMediaService: ServiceFactory<MediaService> = (axios) => {
  const route = '/media'
  return {
    async create(file) {
      FormData = FormData || require('form-data')
      const form: FormData = new FormData()
      form.append('file', file)

      const { data } = await axios.post<{ data: CdnMedia }>(route, form)

      return data.data
    },
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
