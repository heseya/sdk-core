import { UUID } from './UUID'

export interface PaymentMethod {
  id: UUID
  alias: string
  name: string
  public: boolean
}

export type PaymentMethodCreateDto = Omit<PaymentMethod, 'id'>
export type PaymentMethodUpdateDto = PaymentMethodCreateDto

export interface Payment {
  id: UUID
  external_id: string
  method: string
  paid: boolean
  amount: number
  redirect_url: string
  continue_url: string
}
