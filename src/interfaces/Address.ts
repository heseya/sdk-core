import { UUID } from './UUID'

export interface Address {
  id?: UUID
  address: string
  city: string
  country: string
  country_name: string
  name: string
  phone: string
  vat?: string
  zip: string
}

export interface UserSavedAddress {
  default: boolean
  name: string
  address: Address
}
