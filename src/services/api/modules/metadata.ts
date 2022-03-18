import { AxiosInstance } from 'axios'
import { Metadata, MetadataDto } from '../../../interfaces/Metadata'
import { UUID } from '../../../interfaces/UUID'

type UpdateMetadataRequest = (entityId: UUID, metadata: MetadataDto) => Promise<Metadata>

export interface EntityMetadataService {
  /**
   * Allows to update public metadata of an entity.
   */
  updateMetadata: UpdateMetadataRequest
  /**
   * Allows to update private metadata of an entity.
   */
  updateMetadataPrivate: UpdateMetadataRequest
}

const createUpdateMetadataRequest =
  (axios: AxiosInstance, entity: string, publicMetadata = true) =>
  async (entityId: UUID, metadata: MetadataDto): Promise<Metadata> => {
    const path = publicMetadata ? 'metadata' : 'metadata-private'
    const { data } = await axios.patch<{ data: Metadata }>(
      `/${entity}/id:${entityId}/${path}`,
      metadata,
    )
    return data.data
  }

export const createEntityMetadataService = (
  axios: AxiosInstance,
  entity: string,
): EntityMetadataService => {
  return {
    updateMetadata: createUpdateMetadataRequest(axios, entity, true),
    updateMetadataPrivate: createUpdateMetadataRequest(axios, entity, false),
  }
}
