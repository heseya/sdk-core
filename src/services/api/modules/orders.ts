import { HeseyaResponse } from '../../../interfaces/Response'
import {
  OrderSummary,
  OrderList,
  Order,
  OrderCreateDto,
  OrderUpdateDto,
} from '../../../interfaces/Order'
import { OrderPayment } from '../../../interfaces/Payments'
import { PaymentMethodList } from '../../../interfaces/PaymentMethods'
import { CartDto, ProcessedCart } from '../../../interfaces/Cart'
import { OrderProduct, OrderProductUpdateDto } from '../../../interfaces/Product'
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
import { createOrderDocumentsService, OrderDocumentsService } from './ordersDocuments'
import { stringifyQueryParams } from '../../../utils'
import { FieldSort } from '../../../interfaces/Sort'

export interface OrdersListParams extends SearchParam, PaginationParams, MetadataParams {
  /**
   * Sort orders
   * Use array syntax, string value is deprecated and will be removed in future
   */
  sort?: string | Array<FieldSort<'code'> | FieldSort<'summary'> | FieldSort<'created_at'>>
  status_id?: UUID
  shipping_method_id?: UUID
  digital_shipping_method_id?: UUID
  sales_channel_id?: UUID
  payment_method_id?: UUID
  paid?: boolean
  from?: Date
  to?: Date
  ids?: UUID[]
}

export interface OrdersService extends EntityMetadataService {
  /**
   * Creates new payment for the given order
   * @returns The payment URL to redirect the user to
   */
  pay(orderCode: string, paymentMethodId: UUID, continueUrl: string): Promise<string>

  /**
   * Creates payment that is paid for the given order
   * This allows to create payments for orders that are paid offline
   */
  markAsPaid(orderCode: string): Promise<OrderPayment>

  /**
   * Returns the list of payment methods available for the given order
   */
  getPaymentMethods(
    orderCode: string,
  ): Promise<{ order: OrderSummary; paymentMethods: PaymentMethodList[]; code: string }>

  /**
   * Process cart by checking warehouse stock, sales and calculate total items price
   *
   * If any of the products is unavailable, it is not returned in the `items` array.
   * If product does not exist, the request throws an error.
   *
   * If any of the discount codes does not exist/is invalid, it is not returned in the `coupons` array.
   *
   * Sales are applied automatically where possible.
   */
  processCart(cart: CartDto): Promise<ProcessedCart>

  /**
   * Returns the order summary with the given code
   */
  getOneByCode: GetOneBySlugEntityRequest<
    OrderSummary,
    DefaultParams & {
      /**
       * If present, attribute of the given slug will be returned
       * Otherwise, product will not have any attributes
       */
      attribute_slug?: string
    }
  >
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

  /**
   * Adds links to products in the order
   */
  updateProduct(
    orderId: UUID,
    productId: UUID,
    updatedProduct: OrderProductUpdateDto,
  ): Promise<OrderProduct>

  /**
   * Sends email with links to products in the order
   */
  sendProducts(orderId: UUID): Promise<true>
  Documents: OrderDocumentsService
}

export const createOrdersService: ServiceFactory<OrdersService> = (axios) => {
  const route = 'orders'

  // Dependecy injection?
  // Maybe more complex operations should have their own services?
  const paymentMethodsService = createPaymentMethodsService(axios)

  return {
    async pay(code, paymentMethodId, continueUrl) {
      const {
        data: { data },
      } = await axios.post<HeseyaResponse<OrderPayment>>(
        `${route}/${code}/pay/id:${paymentMethodId}`,
        {
          continue_url: continueUrl,
        },
      )

      return data.redirect_url || ''
    },

    async markAsPaid(code) {
      const {
        data: { data },
      } = await axios.post<HeseyaResponse<OrderPayment>>(`${route}/${code}/pay/offline`, {
        continue_url: '/',
      })

      return data
    },

    async processCart(cart) {
      const {
        data: { data },
      } = await axios.post<HeseyaResponse<ProcessedCart>>(`/cart/process`, cart)

      return data
    },

    async getPaymentMethods(code: string) {
      if (!code) throw new Error('No code in param')

      const order = await this.getOneByCode(code)

      if (order.paid) throw new Error('Order already paid')

      const paymentMethods = await paymentMethodsService.get({
        order_code: code,
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

    async updateProduct(orderId, productId, payload) {
      const { data } = await axios.patch<HeseyaResponse<OrderProduct>>(
        encodeURI(`/${route}/id:${orderId}/products/id:${productId}`),
        payload,
      )
      return data.data
    },

    async sendProducts(orderId) {
      await axios.post(encodeURI(`/${route}/id:${orderId}/send-urls`))
      return true
    },

    getOneByCode: createGetOneRequest<OrderSummary>(axios, route),
    getOne: createGetOneRequest<Order>(axios, route, { byId: true }),
    get: createGetListRequest<OrderList>(axios, route),
    update: createPatchRequest(axios, route),
    create: createPostRequest(axios, route),

    Documents: createOrderDocumentsService(axios),

    ...createEntityMetadataService(axios, route),
  }
}
