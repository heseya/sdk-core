import { formatAmount } from '../utils/amounts'

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

export const config = {
  formatAmount,
  cartItemLifeDuration: ONE_WEEK,
}
