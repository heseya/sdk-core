import { UUID } from './UUID'

export interface PaymentMethod {
  id: UUID
  alias: string
  name: string
  public: boolean
}

export type PaymentMethodCreateDto = Omit<PaymentMethod, 'id'>
export type PaymentMethodUpdateDto = PaymentMethodCreateDto
