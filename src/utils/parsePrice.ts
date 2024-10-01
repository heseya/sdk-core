import { DiscountAmount, Price, PriceDto } from '../interfaces'

/**
 * @deprecated
 * TODO: remove before release
 */
export const parsePrices = (prices: Price[], currency: string, type: 'gross' | 'net' = 'gross') =>
  parseFloat((prices || []).find((price) => price.currency === currency)?.[type] || '0') || 0

/**
 * @deprecated
 * TODO: remove before release
 */
export const parsePriceDtos = (prices: PriceDto[], currency: string) =>
  parseFloat((prices || []).find((price) => price.currency === currency)?.value || '0') || 0

export const parseDiscountAmounts = (amounts: DiscountAmount[], currency: string): number =>
  parseFloat((amounts || []).find((amount) => amount.currency === currency)?.value ?? '0')
