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

export type AddressDto = Omit<Address, 'id'>

export interface UserSavedAddressCreateDto {
  default: boolean
  name: string
  address: Address
}

export type UserSavedAddressUpdateDto = UserSavedAddressCreateDto

export interface UserSavedAddress extends UserSavedAddressCreateDto {
  id: UUID
}
