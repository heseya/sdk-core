import { Currency } from '../../../interfaces/Currency'
import { DefaultParams } from '../types/DefaultParams'

import { ServiceFactory } from '../types/Service'
import { createGetSimpleListRequest } from '../utils/requests'

type CurrencyParams = DefaultParams

export interface CurrenciesService {
  /**
   * Returns the list of currencies
   */
  get(params?: CurrencyParams): Promise<Currency[]>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createCurrenciesService: ServiceFactory<CurrenciesService> = (axios) => ({
  get: createGetSimpleListRequest(axios, '/currencies'),
})
