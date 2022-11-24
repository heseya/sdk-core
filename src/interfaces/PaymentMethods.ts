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
