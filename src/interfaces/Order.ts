import { DiscountCode, PaymentMethod } from '.'
import { CartItem } from '..'

export interface OrderStatus {
  id: string
  name: string
  description: string
  color: string
  cancel: boolean
}

export interface Address {
  id?: string
  address: string
  city: string
  country: string
  country_name: string
  name: string
  phone: string
  vat?: string
  zip: string
}

export interface ShippingMethod {
  black_list: boolean
  countries: { code: string; name: string }[]
  id: string
  name: string
  payment_methods: PaymentMethod[]
  price: number
  price_ranges: any[] // TODO: PriceRanges
  public: boolean
}

export interface Order {
  id: string
  code: string
  comment?: string
  created_at: string
  currency: string
  delivery_address: Address
  discounts: DiscountCode[]
  email: string
  invoice_address: Address
  payable: boolean
  paid: boolean
  payments: any[] // TODO: Payment[]
  products: CartItem[]
  shipping_method: ShippingMethod
  shipping_method_id: string
  shipping_number?: string
  shipping_price: number
  status: OrderStatus
  summary: number
  summary_paid: number
}

export interface OrderSummary {
  id: string
  code: string
  status: OrderStatus
  paid: boolean
  payable: boolean
  summary: number
  shipping_method_id: string
  created_at: string
}
