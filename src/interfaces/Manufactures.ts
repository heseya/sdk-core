import { Address } from './Address'
import { UUID } from './UUID'

export interface Manufacturer {
  id: UUID
  name?: string | null
  first_name?: string | null
  last_name?: string | null
  email: string
  address: Address
  product_ids?: string[]
}

export type ManufacturerDto = Omit<Manufacturer, 'id'>

export interface ManufacturerListed {
  id: UUID
  name?: string | null
  first_name?: string | null
  last_name?: string | null
  email: string
}
