import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { UUID } from '../../../interfaces/UUID'
import {
  PaymentMethod,
  PaymentMethodList,
  PaymentMethodCreateDto,
  PaymentMethodUpdateDto,
} from '../../../interfaces/PaymentMethods'
import { PaginationParams } from '../types/DefaultParams'

interface PaymentMethodsParams extends PaginationParams {
  shipping_method_id?: UUID
}

export type PaymentMethodsService = Omit<
  CrudService<
    PaymentMethod,
    PaymentMethodList,
    PaymentMethodCreateDto,
    PaymentMethodUpdateDto,
    PaymentMethodsParams
  >,
  'getOneBySlug'
>

export const createPaymentMethodsService: ServiceFactory<PaymentMethodsService> = (axios) => {
  const route = 'payment-methods'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
