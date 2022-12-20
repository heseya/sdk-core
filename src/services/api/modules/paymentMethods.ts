import { CrudService, ServiceFactory } from '../types/Service'
import {
  createDeleteRequest,
  createGetListRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { UUID } from '../../../interfaces/UUID'
import {
  PaymentMethod,
  PaymentMethodCreateDto,
  PaymentMethodUpdateDto,
} from '../../../interfaces/PaymentMethods'
import { PaginationParams } from '../types/DefaultParams'

interface PaymentMethodsParams extends PaginationParams {
  /**
   * Returns only payment methods that are available for the given shipping method
   */
  shipping_method_id?: UUID
  /**
   * Returns only payment methods that are available for the given order.
   * If order is already paid, returns empty array.
   */
  order_code?: string
}

export type PaymentMethodsService = Omit<
  CrudService<
    PaymentMethod,
    PaymentMethod,
    PaymentMethodCreateDto,
    PaymentMethodUpdateDto,
    PaymentMethodsParams
  >,
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
