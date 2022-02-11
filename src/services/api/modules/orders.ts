import { ServiceFactory } from '../types/Service'
import { OrderSummary, OrderList, Order } from '../../../interfaces/Order'
import { HeseyaResponse } from '../../../interfaces/Response'
import { Payment } from '../../../interfaces/PaymentMethod'

import { createGetListRequest, creategetOneBySlugRequest } from '../utils/requests'
import { GetEntityRequest, getOneEntityRequest, getOneBySlugEntityRequest } from '../types/Requests'
import { SearchParam } from '../types/DefaultParams'

interface OrdersListParams extends SearchParam {
  sort?: string
  status_id?: string
  shipping_method_id?: string
  paid?: boolean
  from?: Date
  to?: Date
}

export interface OrdersService {
  pay(code: string, paymentMethodSlug: string, continueUrl: string): Promise<string>
  getOneBySlug: getOneBySlugEntityRequest<OrderSummary>
  getOne: getOneEntityRequest<Order>
  get: GetEntityRequest<OrderList, OrdersListParams>
}

export const createOrdersService: ServiceFactory<OrdersService> = (axios) => {
  const route = 'orders'
  return {
    async pay(code, paymentMethodSlug, continueUrl) {
      const {
        data: { data },
      } = await axios.post<HeseyaResponse<Payment>>(`${route}/${code}/pay/${paymentMethodSlug}`, {
        continue_url: continueUrl,
      })

      return data.redirect_url
    },

    getOneBySlug: creategetOneBySlugRequest<OrderSummary>(axios, route),
    getOne: creategetOneBySlugRequest<Order>(axios, route, { byId: true }),
    get: createGetListRequest<OrderList>(axios, route),
  }
}
