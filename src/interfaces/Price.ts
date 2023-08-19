export interface Price {
  gross: string
  net: string
  currency: string
}

export interface PriceDto {
  /**
   * This is currently net value
   */
  value: string
  currency: string
}
