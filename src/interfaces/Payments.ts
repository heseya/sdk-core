import { UUID } from './UUID'

export interface OrderPayment {
  id: UUID
  order_id: UUID
  method: string
  paid: boolean
  amount: number
  redirect_url: string
  continue_url: string
  date: string
}

export interface Payment {
  id: UUID
  method: string
  paid: boolean
  redirect_url: string
  continue_url: string
  date: string
  orders: {
    id: UUID
    amount: number
  }[]
}
