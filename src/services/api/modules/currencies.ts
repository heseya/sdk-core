import { Currency } from '../../../interfaces/Currency'
import { DefaultParams } from '../types/DefaultParams'

import { ServiceFactory } from '../types/Service'

type CurrencyParams = DefaultParams

export interface CurrenciesService {
  /**
   * Returns the list of currencies
   */
  get(params: CurrencyParams): Promise<Currency[]>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createCurrenciesService: ServiceFactory<CurrenciesService> = (_axios) => ({
  // TODO: uncomment when API is ready
  // get: createGetSimpleListRequest(axios, '/currencies'),
  async get() {
    return [
      {
        name: 'Polski Złoty',
        code: 'PLN',
        decimal_places: 2,
      },
      {
        name: 'Euro',
        code: 'EUR',
        decimal_places: 2,
      },
    ]
  },
})
