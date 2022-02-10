import { ListResponse, ServiceFactory } from '../types/Service'
import { OrderSummary, OrderList } from '../../../interfaces/Order'
import { HeseyaResponse } from '../../../interfaces/Response'
import { Payment } from '../../../interfaces/PaymentMethod'

import { getApiCall, getOneApiCall } from '../utils/calls'

interface OrdersListParams {
  search?: string
  sort?: string
  status_id?: string
  shipping_method_id?: string
  paid?: boolean
  from?: Date
  to?: Date
}

export interface OrdersService {
  get(params?: OrdersListParams): Promise<ListResponse<OrderList>>
  getOne(slug: string): Promise<OrderSummary>
  pay(code: string, paymentMethodSlug: string, continueUrl: string): Promise<string>
}

export const createOrdersService: ServiceFactory<OrdersService> = (axios) => ({
  async pay(code, paymentMethodSlug, continueUrl) {
    const {
      data: { data },
    } = await axios.post<HeseyaResponse<Payment>>(`orders/${code}/pay/${paymentMethodSlug}`, {
      continue_url: continueUrl,
    })

    return data.redirect_url
  },

  getOne: getOneApiCall<OrderSummary>(axios, 'orders'),
  get: getApiCall<OrderList>(axios, 'orders'),
})
