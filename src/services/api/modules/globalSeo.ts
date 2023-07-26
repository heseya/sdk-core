import { HeseyaResponse } from '../../../interfaces/Response'

import { ServiceFactory } from '../types/Service'

import { UUID } from '../../../interfaces/UUID'
import {
  SeoMetadata,
  SeoMetadataDto,
  SeoCheckModelType,
  SeoCheckResponse,
} from '../../../interfaces/Seo'
import { LanguageParams } from '../../../interfaces'
import { stringifyQueryParams } from '../../../utils'

type GlobalSeoParams = LanguageParams

export interface GlobalSeoService {
  /**
   * Returns the global SEO settings
   */
  get(params?: GlobalSeoParams): Promise<SeoMetadata>

  /**
   * Updates the global SEO setting
   */
  update(updatedGlobalSeo: SeoMetadataDto, params?: GlobalSeoParams): Promise<SeoMetadata>

  /**
   * Allows to check if keywords are already used in other entities.
   */
  check(
    keywords: string[],
    excluded?: {
      id: UUID
      model: SeoCheckModelType
    },
  ): Promise<SeoCheckResponse>
}

export const createGlobalSeoService: ServiceFactory<GlobalSeoService> = (axios) => ({
  async update(updatedGlobalSeo, params) {
    const stringParams = stringifyQueryParams(params || {})
    const {
      data: { data: globalSeo },
    } = await axios.patch<HeseyaResponse<SeoMetadata>>(`/seo?${stringParams}`, updatedGlobalSeo)
    return globalSeo
  },

  async get(params) {
    const stringParams = stringifyQueryParams(params || {})
    const {
      data: { data: globalSeo },
    } = await axios.get<HeseyaResponse<SeoMetadata>>(`/seo?${stringParams}`)
    return globalSeo
  },

  async check(keywords, excluded) {
    const { data } = await axios.post<HeseyaResponse<SeoCheckResponse>>('/seo/check', {
      keywords,
      excluded,
    })
    return data.data
  },
})
