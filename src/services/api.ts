import { AxiosInstance } from 'axios'
import { OrderSummary } from '../interfaces/Order'
import { PaymentMethod } from '../interfaces/PaymentMethod'

export const createEcommerceApi = (axios: AxiosInstance) => ({
  async getOrderPaymentMethods(code: string) {
    if (!code) throw new Error('No code in param')

    const order = await this.getOrder(code)

    if (order.payed) throw new Error('Order already payed')

    const {
      data: { data: paymentMethods },
    } = await axios.get<{ data: PaymentMethod[] }>(
      `payment-methods?shipping_method_id=${order.shipping_method_id}`,
    )

    return {
      order,
      paymentMethods,
      code,
    }
  },

  async getOrder(code: string): Promise<OrderSummary> {
    const {
      data: { data: order },
    } = await axios.get<{ data: OrderSummary }>(`orders/${code}`)

    return order
  },
})

export type ApiService = ReturnType<typeof createEcommerceApi>
