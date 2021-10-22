import { DiscountCode } from '.'

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
  payed: boolean
  payments: any[] // TODO: Payment[]
  products: any[] // TODO: CartItem[]
  shipping_method: any // TODO: ShippingMethod
  shipping_number?: string
  shipping_price: number
  status: OrderStatus
  summary: number
  summary_paid: number
}
