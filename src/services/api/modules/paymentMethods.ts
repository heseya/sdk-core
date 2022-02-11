import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { UUID } from '../../../interfaces/UUID'
import { PaymentMethod, PaymentMethodDto } from '../../../interfaces/PaymentMethod'

interface PaymentMethodsParams {
  shipping_method_id?: UUID
}

export type PaymentMethodsService = Omit<
  CrudService<PaymentMethod, PaymentMethod, PaymentMethodDto, PaymentMethodsParams>,
  'getOneBySlug' | 'getOne'
>

export const createPaymentMethodsService: ServiceFactory<PaymentMethodsService> = (axios) => {
  const route = 'payment-methods'
  return {
    get: createGetListRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
