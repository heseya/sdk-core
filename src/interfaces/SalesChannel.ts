import { Currency } from './Currency'
import { ShippingCountry } from './ShippingMethod'
import { UUID } from './UUID'
import { Language, Translations, TranslationsCreateDto, TranslationsUpdateDto } from './languages'

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
    Translations<TranslatableSalesChannel> {
  id: string
  slug: string
  status: SalesChannelStatus
  vat_rate: string
  default_currency: Currency
  default_language: Language
  country_block_list: boolean
  country_codes: ShippingCountry['code'][]
}

export interface SalesChannelCreateDto extends TranslationsCreateDto<TranslatableSalesChannel> {
  id?: UUID
  slug: string
  status: SalesChannelStatus
  vat_rate: string
  default_currency_id: UUID
  default_language_id: UUID
  country_block_list: boolean
  country_codes: ShippingCountry['code'][]
}

export interface SalesChannelUpdateDto extends TranslationsUpdateDto<TranslatableSalesChannel> {
  slug?: string
  status?: SalesChannelStatus
  vat_rate?: string
  default_currency_id?: UUID
  default_language_id?: UUID
  country_block_list?: boolean
  country_codes?: ShippingCountry['code'][]
}
