import { App } from './App'
import { UUID } from './UUID'

export interface PaymentMethodListed {
  id: UUID
  name: string
  icon: string
  /**
   * @deprecated
   */
  alias: string
  public: boolean
}

/**
 * @deprecated use PaymentMethodListed instead
 */
export type PaymentMethodList = PaymentMethodListed

export interface PaymentMethod extends PaymentMethodListed {
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
