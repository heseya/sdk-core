import { HeseyaResponse } from '../../../interfaces/Response'
import {
  OrderSummary,
  OrderList,
  Order,
  OrderCreateDto,
  OrderUpdateDto,
} from '../../../interfaces/Order'
import { PaymentMethod } from '../../../interfaces/PaymentMethods'
import { CartDto, ProcessedCart } from '../../../interfaces/Cart'
import { UUID } from '../../../interfaces/UUID'

import { ServiceFactory } from '../types/Service'
import {
  GetEntityRequest,
  GetOneEntityRequest,
  GetOneBySlugEntityRequest,
  CreateEntityRequest,
  UpdateEntityRequest,
} from '../types/Requests'
import {
  DefaultParams,
  MetadataParams,
  PaginationParams,
  SearchParam,
} from '../types/DefaultParams'

import {
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'
import { createPaymentMethodsService } from './paymentMethods'
import { createEntityMetadataService, EntityMetadataService } from './metadata'
import { createEntityAuditsService, EntityAuditsService } from './audits'
import { createOrderDocumentsService, OrderDocumentsService } from './ordersDocuments'
import { stringifyQueryParams } from '../../../utils'
import { FieldSort } from '../../../interfaces/Sort'
import { Payment } from '../../../interfaces/Payments'

export interface OrdersListParams extends SearchParam, PaginationParams, MetadataParams {
  /**
   * Sort orders
   * Use array syntax, string value is deprecated and will be removed in future
   */
  sort?: string | Array<FieldSort<'code'> | FieldSort<'summary'> | FieldSort<'created_at'>>
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
  pay(orderIds: UUID[], paymentMethodSlug: string, continueUrl: string): Promise<string>

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
  create: CreateEntityRequest<Order, OrderCreateDto>
  update: UpdateEntityRequest<Order, OrderUpdateDto>
  updateStatus: UpdateEntityRequest<
    true,
    {
      status_id: UUID
    },
    DefaultParams
  >
  Documents: OrderDocumentsService
}

export const createOrdersService: ServiceFactory<OrdersService> = (axios) => {
  const route = 'orders'

  // Dependecy injection?
  // Maybe more complex operations should have their own services?
  const paymentMethodsService = createPaymentMethodsService(axios)

  return {
    async pay(orderIds, paymentMethodSlug, continueUrl) {
      const {
        data: { data },
      } = await axios.post<HeseyaResponse<Payment>>(`${route}/pay/${paymentMethodSlug}`, {
        continue_url: continueUrl,
        orders: orderIds.map((id) => ({ id })),
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
        shipping_method_id: order.shipping_method.id,
      })

      return {
        order,
        paymentMethods: paymentMethods.data,
        code,
      }
    },

    async updateStatus(parentId, payload, params) {
      const stringParams = stringifyQueryParams(params || {})
      await axios.patch(encodeURI(`/${route}/id:${parentId}/status?${stringParams}`), payload)
      return true
    },

    getOneByCode: createGetOneRequest<OrderSummary>(axios, route),
    getOne: createGetOneRequest<Order>(axios, route, { byId: true }),
    get: createGetListRequest<OrderList>(axios, route),
    update: createPatchRequest(axios, route),
    create: createPostRequest(axios, route),

    Documents: createOrderDocumentsService(axios),

    ...createEntityMetadataService(axios, route),
    ...createEntityAuditsService(axios, route),
  }
}
