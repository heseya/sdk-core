import { DiscountCode, PaymentMethod } from '.'
import { CartItem } from '../models/CartItem'
import { UUID } from './UUID'

export interface OrderStatus {
  id: UUID
  name: string
  description: string
  color: string
  cancel: boolean
}

export interface Address {
  id?: UUID
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
  id: UUID
  black_list: boolean
  countries: { code: string; name: string }[]
  name: string
  payment_methods: PaymentMethod[]
  price: number
  price_ranges: any[] // TODO: PriceRanges
  public: boolean
  shipping_time_max: number
  shipping_time_min: number
}

export interface Order {
  id: UUID
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
  id: UUID
  code: string
  status: OrderStatus
  paid: boolean
  payable: boolean
  summary: number
  shipping_method_id: string
  created_at: string
}
