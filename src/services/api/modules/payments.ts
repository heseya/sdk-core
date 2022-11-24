import { CrudService, ServiceFactory } from '../types/Service'
import {
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'

import { Payment, PaymentCreateDto, PaymentUpdateDto } from '../../../interfaces/Payments'

export type PaymentsService = Omit<
  CrudService<Payment, Payment, PaymentCreateDto, PaymentUpdateDto>,
  'getOneBySlug' | 'delete'
>

export const createPaymentsService: ServiceFactory<PaymentsService> = (axios) => {
  const route = 'payments'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
  }
}
