import { AxiosInstance } from 'axios'
import { HeseyaResponse } from '../../../interfaces'
import { EntityAudits } from '../../../interfaces/Audits'
import { UUID } from '../../../interfaces/UUID'

export interface EntityAuditsService<Entity> {
  /**
   * Returns audits for the given entity.
   */
  getAudits: (entityId: UUID) => Promise<EntityAudits<Entity>>
}

export const createEntityAuditsService = <Entity>(
  axios: AxiosInstance,
  entity: string,
): EntityAuditsService<Entity> => {
  return {
    async getAudits(entityId) {
      const { data } = await axios.get<HeseyaResponse<EntityAudits<Entity>>>(
        `/audits/${entity}/id:${entityId}`,
      )
      return data.data
    },
  }
}
