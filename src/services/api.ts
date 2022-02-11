// TODO: delete file

import { AxiosInstance } from 'axios'
import { OrderSummary } from '../interfaces/Order'
import { Page } from '../interfaces/Page'
import { PaymentMethod } from '../interfaces/PaymentMethod'
import { SeoMetadata } from '../interfaces/Seo'

/**
 * Migrate to createHeseyaApiService factory
 * @deprecated
 */
export const createEcommerceApi = (axios: AxiosInstance) => ({
  /**
   * ! Migrated to -> Orders.getPaymentMethods
   */
  async getOrderPaymentMethods(code: string) {
    if (!code) throw new Error('No code in param')

    const order = await this.getOrder(code)

    if (order.paid) throw new Error('Order already paid')

    const paymentMethods = await this.getPaymentMethods(order.shipping_method_id)

    return {
      order,
      paymentMethods,
      code,
    }
  },

  /**
   * ! Migrated to -> Orders.getOneBySlug
   */
  async getOrder(code: string): Promise<OrderSummary> {
    const {
      data: { data: order },
    } = await axios.get<{ data: OrderSummary }>(`orders/${code}`)

    return order
  },

  /**
   * ! Migrated to -> PaymentMethods.get
   */
  async getPaymentMethods(shippingMethodId?: string): Promise<PaymentMethod[]> {
    const query = shippingMethodId ? `shipping_method_id=${shippingMethodId}` : ''

    const {
      data: { data: paymentMethods },
    } = await axios.get<{ data: PaymentMethod[] }>(`payment-methods?limit=500&${query}`)

    return paymentMethods
  },

  /**
   * ! Migrated to -> GlobalSeo.get
   */
  async getGlobalSeo(): Promise<SeoMetadata> {
    const {
      data: { data: page },
    } = await axios.get<{ data: SeoMetadata }>('/seo')
    return page
  },

  /**
   * ! Migrated to -> Pages.getOneBySlug
   */
  async getPage(slug: string): Promise<Page> {
    const {
      data: { data: page },
    } = await axios.get<{ data: Page }>(`/pages/${slug}`)
    return page
  },

  /**
   * ! Migrated to -> Orders.pay
   */
  async createPayment(
    orderCode: string,
    paymentMethod: string,
    continueUrl: string,
  ): Promise<string> {
    const {
      data: { data },
    } = await axios.post<{ data: { redirect_url: string } }>(
      `orders/${orderCode}/pay/${paymentMethod}`,
      {
        continue_url: continueUrl,
      },
    )

    return data.redirect_url
  },
})

export type ApiService = ReturnType<typeof createEcommerceApi>
