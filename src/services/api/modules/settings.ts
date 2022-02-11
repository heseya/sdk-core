import { HeseyaPaginatedResponse } from '../../../interfaces/Response'
import { Setting, SettingDto } from '../../../interfaces/Settings'
import { ListResponse } from '../types/Requests'
import { CrudService, ServiceFactory } from '../types/Service'
import { normalizePagination } from '../utils/normalizePagination'
import { createDeleteRequest, createPatchRequest, createPostRequest } from '../utils/requests'

type SettingsRecord = Record<string, string | number>

export interface SettingsService
  extends Omit<CrudService<Setting, Setting, SettingDto>, 'getOne' | 'getOneBySlug' | 'get'> {
  /**
   * Returns the list of settings
   * @example
   * heseya.Settings.get() // { data: Settings[], meta: HeseyaPaginationMeta}
   * heseya.Settings.get({ array: true }) // Record<string, string | number>
   */
  get(params?: { array?: false }): Promise<ListResponse<Setting>>
  get(params: { array: true }): Promise<SettingsRecord>
}

export const createSettingsService: ServiceFactory<SettingsService> = (axios) => {
  const route = 'settings'
  return {
    async get(params) {
      if (params?.array) {
        const { data } = await axios.get<SettingsRecord>(`/${route}?array`)
        // Withouth any, the TS compiler complains about the return type (i dont know why)
        return data as any
      }

      const response = await axios.get<HeseyaPaginatedResponse<Setting[]>>(`/${route}`)
      const { data, meta } = response.data

      return { data, pagination: normalizePagination(meta) } as ListResponse<Setting>
    },
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
