import { AxiosInstance } from 'axios'
import { HeseyaService } from './interfaces/HeseyaService'
import { createProductsService } from './products'

export const createHeseyaService = (axios: AxiosInstance): HeseyaService => ({
  Products: createProductsService(axios),
})
