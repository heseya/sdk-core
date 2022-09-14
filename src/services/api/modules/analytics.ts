import { HeseyaResponse } from '../../../interfaces'
import { AnalyticsPaymentsSummary } from '../../../interfaces/Analytics'

import { ServiceFactory } from '../types/Service'
import { stringifyQueryParams } from '../../../utils/stringifyQueryParams'

interface AnalyticsPaymentsParams {
  from?: Date
  to?: Date
  group?: 'total' | 'monthly' | 'daily' | 'hourly'
}

export interface AnalyticsService {
  /**
   * Allows to get the payments summary for the given period
   * Returns total amount and count of payments. By default period is last year.
   * Results are grouped in specified time frames.
   */
  getPayments: (params?: AnalyticsPaymentsParams) => Promise<AnalyticsPaymentsSummary>
}

export const createAnalyticsService: ServiceFactory<AnalyticsService> = (axios) => ({
  async getPayments(params) {
    const stringParams = stringifyQueryParams(params || {})
    const { data } = await axios.get<HeseyaResponse<AnalyticsPaymentsSummary>>(
      `analytics/payments?${stringParams}`,
    )
    return data.data
  },
})
