import { UUID } from './UUID'

export interface PaymentMethod {
  id: UUID
  alias: string
  name: string
  public: boolean
}
