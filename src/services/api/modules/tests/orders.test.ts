import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import {
  CartDto,
  HeseyaPaginatedResponse,
  HeseyaResponse,
  OrderPayment,
  OrderStatus,
  OrderSummary,
  PaymentMethod,
  PaymentStatus,
  ProcessedCart,
  ShippingMethod,
} from '../../../../interfaces'

import { createOrdersService } from '../orders'

const dummyOrdersResponse: HeseyaResponse<OrderPayment> = {
  data: {
    id: '1',
    external_id: '1',
    method: 'payu',
    method_id: null,
    status: PaymentStatus.Successful,
    amount: 2137,
    redirect_url: '/redirect',
    continue_url: '/continue',
    date: '2020-01-01',
  },
  meta: {
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
    language: { symbol: 'pl' },
  },
}

const dummyCardProccessResponse: HeseyaResponse<ProcessedCart> = {
  data: {
    cart_total_initial: 121,
    cart_total: 200,
    shipping_price_initial: 21,
    shipping_price: 37,
    shipping_time: null,
    shipping_date: null,
    summary: 1000,
    items: [],
    coupons: [],
    sales: [],
  },
  meta: {
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
    language: { symbol: 'pl' },
  },
}

const dummyCardDto: CartDto = {
  items: [],
  coupons: ['coupon'],
}

const dummyOrderSummaryResponse: { data: OrderSummary } = {
  data: {
    id: 'aaa',
    code: '2137',
    status: {} as OrderStatus,
    paid: false,
    payable: true,
    cart_total_initial: 121,
    cart_total: 121,
    shipping_price_initial: 21,
    shipping_price: 21,
    summary: 2134,
    shipping_method: {} as ShippingMethod,
    digital_shipping_method: null,
    created_at: '2022',
    metadata: {},
  },
}

const dummyOrderPaidSummaryResponse: { data: OrderSummary } = {
  data: { ...dummyOrderSummaryResponse.data, paid: true },
}

const dummyPaymentMethodsResponse: HeseyaPaginatedResponse<PaymentMethod[]> = {
  data: [
    {
      id: '1',
      alias: 'payu',
      name: 'payu',
      public: true,
      url: 'https://payu.com',
      icon: 'https://payu.com/icon.png',
      app: null,
    },
  ],
  meta: {
    per_page: 24,
    current_page: 1,
    last_page: 2,
    total: 25,
    from: 1,
    to: 2,
    path: '/path',
    currency: { name: 'pln', symbol: 'pln', decimals: 2 },
    language: { symbol: 'pl' },
  },
}

const dummyPaymentMethodsResponseData: {
  order: OrderSummary
  paymentMethods: PaymentMethod[]
  code: string
} = {
  order: dummyOrderSummaryResponse.data,
  paymentMethods: dummyPaymentMethodsResponse.data,
  code: '2137',
}

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('orders service test', () => {
  it('should make a request to create new payment for the given order', async () => {
    const service = createOrdersService(axios)
    const expectedUrl = `orders/2137/pay/id:payment-id`

    mock.onPost(expectedUrl).reply(200, dummyOrdersResponse)

    const result = await service.pay('2137', 'payment-id', dummyOrdersResponse.data.continue_url)
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyOrdersResponse.data.redirect_url)
  })

  it('should make a request to mark given order as paid', async () => {
    const service = createOrdersService(axios)
    const expectedUrl = `orders/2137/pay/offline`

    mock.onPost(expectedUrl).reply(200, dummyOrdersResponse)

    const result = await service.markAsPaid('2137')
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyOrdersResponse.data)
  })

  it('should process cart by checking warehouse stock, sales and calculate total items price', async () => {
    const service = createOrdersService(axios)
    const expectedUrl = `cart/process`

    mock.onPost(expectedUrl).reply(200, dummyCardProccessResponse)

    const result = await service.processCart(dummyCardDto)
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyCardProccessResponse.data)
  })

  it('should return the list of payment methods available for the given order', async () => {
    const service = createOrdersService(axios)
    const expectedOrderUrl = `/orders/2137?`
    const expectedPaymentMethodsUrl = `/payment-methods?order_code=2137`

    mock.onGet(expectedOrderUrl).reply(200, dummyOrderSummaryResponse)
    mock.onGet(expectedPaymentMethodsUrl).reply(200, dummyPaymentMethodsResponse)

    const result = await service.getPaymentMethods('2137')

    expect(mock.history.get[0]?.url).toEqual(expectedOrderUrl)
    expect(mock.history.get[1]?.url).toEqual(expectedPaymentMethodsUrl)
    expect(result).toEqual(dummyPaymentMethodsResponseData)
  })

  it("should throw Error with message 'No code in param' when no code parameter were passed", async () => {
    const service = createOrdersService(axios)
    const orderUrl = `/orders/2137?`

    mock.onGet(orderUrl).reply(200, dummyOrderSummaryResponse)

    await expect(service.getPaymentMethods('')).rejects.toThrow('No code in param')
  })

  it("should throw Error with message 'Order already paid' if order was paid", async () => {
    const service = createOrdersService(axios)
    const expectedUrl = `/orders/2137?`

    mock.onGet(expectedUrl).reply(200, dummyOrderPaidSummaryResponse)

    await expect(service.getPaymentMethods('2137')).rejects.toThrow('Order already paid')
  })

  it('should update order status', async () => {
    const service = createOrdersService(axios)
    const expectedUrl = '/orders/id:test/status?param=yes'

    mock.onPatch(expectedUrl).reply(200, { data: {} })

    const result = await service.updateStatus('test', { status_id: 'xd' }, { param: 'yes' })

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should update order products links', async () => {
    const service = createOrdersService(axios)
    const expectedUrl = '/orders/id:test/products/id:product_id'

    mock.onPatch(expectedUrl).reply(200, { data: { id: 'item_id' } })

    const result = await service.updateProduct('test', 'product_id', {
      is_delivered: false,
      urls: {
        'test-name': 'https://example.com',
      },
    })

    expect(mock.history.patch[0].url).toEqual(expectedUrl)
    expect(result).toEqual({ id: 'item_id' })
  })

  it('should send all products via email', async () => {
    const service = createOrdersService(axios)
    const expectedUrl = '/orders/id:test/send-urls'

    mock.onPost(expectedUrl).reply(200, { data: {} })

    const result = await service.sendProducts('test')

    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
