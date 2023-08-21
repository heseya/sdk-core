import { StrNumber } from './Number'

export interface Price {
  gross: StrNumber
  net: StrNumber
  currency: string
}

export interface PriceDto {
  /**
   * This is currently net value
   */
  value: StrNumber
  currency: string
}
