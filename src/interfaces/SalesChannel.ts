import { Currency } from './Currency'
import { ShippingCountry } from './ShippingMethod'
import { UUID } from './UUID'
import {
  Language,
  PublishedTranslations,
  PublishedTranslationsCreateDto,
  PublishedTranslationsUpdateDto,
  Translations,
  TranslationsCreateDto,
  TranslationsUpdateDto,
} from './languages'

export interface TranslatableSalesChannel {
  name: string
}

export enum SalesChannelStatus {
  Active = 'active',
  Inactive = 'inactive',
  Hidden = 'hidden',
}

export interface SalesChannel
  extends TranslatableSalesChannel,
    Translations<TranslatableSalesChannel>,
    PublishedTranslations {
  id: string
  slug: string
  status: SalesChannelStatus
  vat_rate: string
  default_currency: Currency
  default_language: Language
  countries_block_list: boolean
  countries: ShippingCountry['code'][]
}

export interface SalesChannelCreateDto
  extends TranslationsCreateDto<TranslatableSalesChannel>,
    PublishedTranslationsCreateDto {
  id?: UUID
  slug: string
  status: SalesChannelStatus
  vat_rate: string
  default_currency: UUID
  default_language_id: UUID
  countries_block_list: boolean
  countries: ShippingCountry['code'][]
}

export type SalesChannelUpdateDto = Partial<
  Omit<SalesChannelCreateDto, 'id' | 'translations' | 'published'>
> &
  TranslationsUpdateDto<TranslatableSalesChannel> &
  PublishedTranslationsUpdateDto
