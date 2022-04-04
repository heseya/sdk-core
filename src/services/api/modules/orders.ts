import { HeseyaResponse } from '../../../interfaces/Response'
import {
  OrderSummary,
  OrderList,
  Order,
  OrderDto,
  OrderUpdateDto,
  OrderStatusUpdateDto,
} from '../../../interfaces/Order'
import { Payment, PaymentMethod } from '../../../interfaces/PaymentMethod'

import { ServiceFactory } from '../types/Service'
import {
  GetEntityRequest,
  GetOneEntityRequest,
  GetOneBySlugEntityRequest,
  CreateEntityRequest,
  UpdateEntityRequest,
} from '../types/Requests'
import { MetadataParams, PaginationParams, SearchParam } from '../types/DefaultParams'

import {
  createGetListRequest,
  createGetOneRequest,
  createPostNestedRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'
import { createPaymentMethodsService } from './paymentMethods'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { createEntityAuditsService, EntityAuditsService } from './audits'
import { CartDto, ProcessedCart } from '../../../interfaces/Cart'

export interface OrdersListParams extends SearchParam, PaginationParams, MetadataParams {
  sort?: string
  status_id?: string
  shipping_method_id?: string
  paid?: boolean
  from?: Date
  to?: Date
}

export interface OrdersService extends EntityMetadataService, EntityAuditsService<Order> {
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
   * Process cart by checking warehouse stock, sales and calculate total items price
   *
   * If any of the products is unavailable, it is not returned in the `items` array.
   *
   * If any of the discount codes does not exist/is invalid, it is not returned in the `coupons` array.
   *
   * Sales are applied automatically where possible.
   */
  processCart(cart: CartDto): Promise<ProcessedCart>

  /**
   * Returns the order summary with the given code
   */
  getOneByCode: GetOneBySlugEntityRequest<OrderSummary>
  getOne: GetOneEntityRequest<Order>
  get: GetEntityRequest<OrderList, OrdersListParams>
  create: CreateEntityRequest<Order, OrderDto>
  update: UpdateEntityRequest<Order, OrderUpdateDto>
  updateStatus: UpdateEntityRequest<Order, OrderStatusUpdateDto>
}

export const createOrdersService: ServiceFactory<OrdersService> = (axios) => {
  const route = 'orders'

  // Dependecy injection?
  // Maybe more complex operations should have their own services?
  const paymentMethodsService = createPaymentMethodsService(axios)

  return {
    async pay(code, paymentMethodSlug, continueUrl) {
      const {
        data: { data },
      } = await axios.post<HeseyaResponse<Payment>>(`${route}/${code}/pay/${paymentMethodSlug}`, {
        continue_url: continueUrl,
      })

      return data.redirect_url
    },

    async processCart(cart) {
      const {
        data: { data },
      } = await axios.post<HeseyaResponse<ProcessedCart>>(`cart/process`, cart)

      return data
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

    updateStatus: createPostNestedRequest(axios, route, 'status'),

    getOneByCode: createGetOneRequest<OrderSummary>(axios, route),
    getOne: createGetOneRequest<Order>(axios, route, { byId: true }),
    get: createGetListRequest<OrderList>(axios, route),
    update: createPatchRequest(axios, route),
    create: createPostRequest(axios, route),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
