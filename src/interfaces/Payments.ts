import { App } from './App'
import { UUID } from './UUID'

export interface PaymentMethodList {
  id: UUID
  name: string
  icon: string
  /**
   * @deprecated
   */
  alias: string
  public: boolean
}

export interface PaymentMethod extends PaymentMethodList {
  url: string
  app: App | null
}

export interface PaymentMethodCreateDto {
  name: string
  icon: string
  public: boolean
  url: string
}

export type PaymentMethodUpdateDto = Partial<PaymentMethodCreateDto>

// ? ------------------------------------------------------------------------------------------
// ? PAYMENTS
// ? ------------------------------------------------------------------------------------------

export interface OrderPayment {
  id: UUID
  payment_id: UUID
  method: string
  status: PaymentStatus
  amount: number
  redirect_url: string
  continue_url: string
  date: string
}

export enum PaymentStatus {
  Pending = 'pending',
  Failed = 'failed',
  Successfull = 'successfull',
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
