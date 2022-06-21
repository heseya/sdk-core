import { FormData } from 'formdata-polyfill'

import { CdnMedia, CdnMediaUpdateDto, CdnMediaCreateDto } from '../../../interfaces/CdnMedia'
import { DeleteEntityRequest, UpdateEntityRequest } from '../types/Requests'
import { ServiceFactory } from '../types/Service'
import { createDeleteRequest, createPatchRequest } from '../utils/requests'
import { createEntityMetadataService, EntityMetadataService } from './metadata'

export interface MediaService extends EntityMetadataService {
  /**
   * Allows a user to create the Media.
   * Notice: metadata can only be strings in this method, cause you cant send type in FormData
   */
  create: (data: CdnMediaCreateDto) => Promise<CdnMedia>
  /**
   * Allows a user to update the Media.
   */
  update: UpdateEntityRequest<CdnMedia, CdnMediaUpdateDto>
  /**
   * Allows a user to delete the Media.
   */
  delete: DeleteEntityRequest
}

export const createMediaService: ServiceFactory<MediaService> = (axios) => {
  const route = '/media'
  return {
    async create({ file, alt, metadata, metadata_private }) {
      const form = new FormData()
      form.append('file', file)

      if (alt) form.append('alt', alt)

      if (metadata)
        Object.entries(metadata).forEach(([key, value]) => form.append(`metadata.${key}`, value))

      if (metadata_private)
        Object.entries(metadata_private).forEach(([key, value]) =>
          form.append(`metadata_private.${key}`, value),
        )

      const { data } = await axios.post<{ data: CdnMedia }>(route, form)

      return data.data
    },
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
