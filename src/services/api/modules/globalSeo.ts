import { ServiceFactory } from '../types/Service'
import { HeseyaResponse } from '../../../interfaces/Response'

import { createPatchRequest } from '../utils/requests'
import { UpdateEntityRequest } from '../types/Requests'
import { SeoMetadata, SeoMetadataDto } from '../../../interfaces/Seo'
import { UUID } from '../../../interfaces/UUID'

type SeoCheckModelType = 'Product' | 'ProductSet' | 'Page'

interface SeoCheckResponse {
  duplicated: boolean
  duplicates: { id: UUID; model_type: SeoCheckModelType }[]
}

export interface GlobalSeoService {
  /**
   * Returns the global SEO settings
   */
  get(): Promise<SeoMetadata>

  /**
   * Updates the global SEO setting
   */
  update: UpdateEntityRequest<SeoMetadata, SeoMetadataDto>

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
  update: createPatchRequest(axios, 'seo'),

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
