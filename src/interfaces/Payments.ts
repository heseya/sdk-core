import { StrNumber } from './Number'
import { UUID } from './UUID'
export interface OrderPayment {
  id: UUID
  external_id: UUID
  method: string
  method_id: UUID | null
  status: PaymentStatus
  amount: StrNumber
  currency: string
  redirect_url: string | null
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
  amount: StrNumber
  currency: string
}

export interface PaymentCreateDto {
  external_id: string
  method_id: UUID // PaymentMethod.id
  order_id: UUID // Order.id
  status: PaymentStatus
  amount: StrNumber
}

export type PaymentUpdateDto = Partial<PaymentCreateDto>
