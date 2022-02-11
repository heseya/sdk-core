import { ServiceFactory } from '../types/Service'
import { OrderSummary, OrderList, Order } from '../../../interfaces/Order'
import { HeseyaResponse } from '../../../interfaces/Response'
import { Payment, PaymentMethod } from '../../../interfaces/PaymentMethod'

import { createGetListRequest, createGetOneRequest } from '../utils/requests'
import { GetEntityRequest, getOneEntityRequest, getOneBySlugEntityRequest } from '../types/Requests'
import { SearchParam } from '../types/DefaultParams'
import { createPaymentMethodsService } from './paymentMethods'

interface OrdersListParams extends SearchParam {
  sort?: string
  status_id?: string
  shipping_method_id?: string
  paid?: boolean
  from?: Date
  to?: Date
}

export interface OrdersService {
  /**
   * Creates new payment for the given order
   * @returns The payment URL to redirect the user to
   */
  pay(code: string, paymentMethodSlug: string, continueUrl: string): Promise<string>

  /**
   * Returns the list of payment methods available for the given order
   */
  getPaymentMethods(
    code: string,
  ): Promise<{ order: OrderSummary; paymentMethods: PaymentMethod[]; code: string }>

  /**
   * Returns the order summary with the given code
   */
  getOneByCode: getOneBySlugEntityRequest<OrderSummary>
  getOne: getOneEntityRequest<Order>
  get: GetEntityRequest<OrderList, OrdersListParams>
}

export const createOrdersService: ServiceFactory<OrdersService> = (axios) => {
  const paymentMethodsService = createPaymentMethodsService(axios)
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

    async getPaymentMethods(code: string) {
      if (!code) throw new Error('No code in param')

      const order = await this.getOneByCode(code)

      if (order.paid) throw new Error('Order already paid')

      const paymentMethods = await paymentMethodsService.get({
        shipping_method_id: order.shipping_method_id,
      })

      return {
        order,
        paymentMethods: paymentMethods.data,
        code,
      }
    },

    getOneByCode: createGetOneRequest<OrderSummary>(axios, route),
    getOne: createGetOneRequest<Order>(axios, route, { byId: true }),
    get: createGetListRequest<OrderList>(axios, route),
  }
}
