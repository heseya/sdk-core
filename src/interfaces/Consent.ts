import { UUID } from './UUID'

export interface Consent {
  id: UUID
  name: string
  description_html: string
  required: boolean
  created_at: string
  updated_at: string
}

export interface ConsentCreateDto {
  name: string
  description_html: string
  required: boolean
}

export type ConsentUpdateDto = ConsentCreateDto

// ? --------------------------------------------------

export interface UserConsent extends Consent {
  value: boolean
}

export type UserConsentDto = Record<UUID, boolean>
