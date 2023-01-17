import { UUID } from './UUID'
export interface OrderPayment {
  id: UUID
  external_id: UUID
  method: string
  method_id: null | UUID
  status: PaymentStatus
  amount: number
  redirect_url: string
  continue_url: string
  date: string
}

export enum PaymentStatus {
  Pending = 'pending',
  Failed = 'failed',
  Successful = 'successful',
}

export interface Payment {
  id: UUID
  external_id: string
  method_id: UUID // PaymentMethod.id
  status: PaymentStatus
  amount: number
}

export interface PaymentCreateDto {
  external_id: string
  method_id: UUID // PaymentMethod.id
  order_id: UUID // Order.id
  status: PaymentStatus
  amount: number
}

export type PaymentUpdateDto = Partial<PaymentCreateDto>
