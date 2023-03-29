import { AxiosInstance } from 'axios'
import { Metadata, MetadataUpdateDto } from '../../../interfaces/Metadata'
import { UUID } from '../../../interfaces/UUID'

type UpdateMetadataRequest = (entityId: UUID, metadata: MetadataUpdateDto) => Promise<Metadata>

export enum MetadataType {
  Public = 'metadata',
  Private = 'metadata-private',
  Personal = 'metadata-personal',
}

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

export const createUpdateMetadataRequest =
  (axios: AxiosInstance, entity: string, type: MetadataType = MetadataType.Public) =>
  async (entityId: UUID, metadata: MetadataUpdateDto): Promise<Metadata> => {
    const { data } = await axios.patch<{ data: Metadata }>(
      `/${entity}/id:${entityId}/${type}`,
      metadata,
    )
    return data.data
  }

export const createEntityMetadataService = (
  axios: AxiosInstance,
  entity: string,
): EntityMetadataService => {
  return {
    updateMetadata: createUpdateMetadataRequest(axios, entity, MetadataType.Public),
    updateMetadataPrivate: createUpdateMetadataRequest(axios, entity, MetadataType.Private),
  }
}
