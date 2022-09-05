import { HeseyaResponse } from '../../../interfaces/Response'

import { ServiceFactory } from '../types/Service'
import { UpdateEntityRequest } from '../types/Requests'
import { createPatchRequest } from '../utils/requests'

import { UUID } from '../../../interfaces/UUID'
import {
  SeoMetadata,
  SeoMetadataDto,
  SeoCheckModelType,
  SeoCheckResponse,
} from '../../../interfaces/Seo'

export interface GlobalSeoService {
  /**
   * Returns the global SEO settings
   */
  get(): Promise<SeoMetadata>

  /**
   * Updates the global SEO setting
   */
  update(updatedGlobalSeo: SeoMetadataDto): Promise<SeoMetadata>

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
  async update(updatedGlobalSeo: SeoMetadataDto) {
    const {
      data: { data: globalSeo },
    } = await axios.patch<HeseyaResponse<SeoMetadata>>('/seo', updatedGlobalSeo)
    return globalSeo
  },

  async get() {
    const {
      data: { data: globalSeo },
    } = await axios.get<HeseyaResponse<SeoMetadata>>('/seo')
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
