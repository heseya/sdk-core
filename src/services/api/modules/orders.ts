import { ListResponse, ServiceFactory } from '../types/Service'
import { OrderSummary, Order, OrderList } from '../../../interfaces/Order'
import { HeseyaPaginatedResponse, HeseyaResponse } from '../../../interfaces/Response'

import { normalizePagination } from '../utils/normalizePagination'
import { stringifyQueryParams } from '../utils/stringifyQueryParams'
import { Payment } from '../../../interfaces/PaymentMethod'

interface OrdersListParams {
  search: string
  sort: string
  status_id: string
  shipping_method_id: string
  paid: boolean
  from: Date
  to: Date
}

export interface OrdersService {
  get(params?: OrdersListParams): Promise<ListResponse<OrderList>>
  getOne(slug: string): Promise<Order>
  getOneSummary(code: string): Promise<OrderSummary>
  pay(code: string, paymentMethodSlug: string, continueUrl: string): Promise<string>
}

export const createOrdersService: ServiceFactory<OrdersService> = (axios) => ({
  async getOneSummary(code) {
    const {
      data: { data: order },
    } = await axios.get<HeseyaResponse<OrderSummary>>(`orders/${code}`)

    return order
  },

  async pay(code, paymentMethodSlug, continueUrl) {
    const {
      data: { data },
    } = await axios.post<HeseyaResponse<Payment>>(`orders/${code}/pay/${paymentMethodSlug}`, {
      continue_url: continueUrl,
    })

    return data.redirect_url
  },

  async getOne(slug) {
    const response = await axios.get<HeseyaResponse<Order>>(`/orders/${slug}`)
    return response.data.data
  },

  async get(params) {
    const stringParams = stringifyQueryParams(params || {})
    const response = await axios.get<HeseyaPaginatedResponse<Order[]>>(`/orders?${stringParams}`)
    const { data, meta } = response.data
    return { data, pagination: normalizePagination(meta) }
  },
})
