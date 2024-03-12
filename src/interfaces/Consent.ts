import { UUID } from './UUID'

import {
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

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
  created_at: string
  updated_at: string
}

export interface ConsentCreateDto
  extends PublishedTranslationsCreateDto,
    TranslationsCreateDto<ConsentTranslatable> {
  required: boolean
}

export type ConsentUpdateDto = Partial<ConsentCreateDto> &
  PublishedTranslationsUpdateDto &
  TranslationsUpdateDto<Partial<ConsentTranslatable>>

// ? --------------------------------------------------

export interface UserConsent extends Consent {
  value: boolean
}

export type UserConsentDto = Record<UUID, boolean>
