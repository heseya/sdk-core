import {
  CdnMedia,
  CdnMediaType,
  CdnMediaExtended,
  CdnMediaUpdateDto,
  CdnMediaCreateDto,
  CdnMediaSource,
} from '../../../interfaces/CdnMedia'
import { PaginationParams } from '../types/DefaultParams'
import { DeleteEntityRequest, GetEntityRequest, UpdateEntityRequest } from '../types/Requests'
import { ServiceFactory } from '../types/Service'
import { createGetListRequest, createDeleteRequest, createPatchRequest } from '../utils/requests'
import { createFormData } from '../utils/createFormData'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { UUID } from '../../../interfaces/UUID'

export interface MediaService extends EntityMetadataService {
  /**
   * Returns a list of media
   */
  get: GetEntityRequest<
    CdnMediaExtended,
    { type?: CdnMediaType; has_relationships?: boolean; ids?: UUID[] } & PaginationParams
  >
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
    async create(dto) {
      const form = await createFormData()

      if (dto.source === CdnMediaSource.External) {
        form.append('type', dto.type)
        form.append('url', dto.url)
      } else {
        // dto.source === CdnMediaSource.Silverbox
        form.append('file', dto.file, 'media')
      }

      if (dto.source) form.append('source', dto.source)
      if (dto.alt) form.append('alt', dto.alt)
      if (dto.slug) form.append('slug', dto.slug)

      if (dto.metadata)
        Object.entries(dto.metadata).forEach(([key, value]) =>
          form.append(`metadata.${key}`, value),
        )

      if (dto.metadata_private)
        Object.entries(dto.metadata_private).forEach(([key, value]) =>
          form.append(`metadata_private.${key}`, value),
        )

      const { data } = await axios.post<{ data: CdnMedia }>(route, form)

      return data.data
    },
    get: createGetListRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),

    ...createEntityMetadataService(axios, route),
  }
}
