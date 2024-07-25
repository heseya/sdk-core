import { UUID } from './UUID'

import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

export enum ConsentType {
  User = 'user',
  Organization = 'organization',
}

interface ConsentTranslatable {
  name: string
  /**
   * Max 16000 characters
   */
  description_html: string
}

export interface Consent
  extends ConsentTranslatable,
    Translations<ConsentTranslatable>,
    PublishedTranslations {
  id: UUID
  required: boolean
  type: ConsentType
  created_at: string
  updated_at: string
}

export interface ConsentCreateDto
  extends PublishedTranslationsCreateDto,
    TranslationsCreateDto<ConsentTranslatable> {
  required: boolean
  type: ConsentType
}

export type ConsentUpdateDto = Partial<ConsentCreateDto> &
  PublishedTranslationsUpdateDto &
  TranslationsUpdateDto<Partial<ConsentTranslatable>>

// ? --------------------------------------------------

export interface UserConsent extends Consent {
  value: boolean
}
export type UserConsentDto = Record<UUID, boolean>

export type OrganizationConsent = UserConsent
export type OrganizationConsentDto = UserConsentDto
