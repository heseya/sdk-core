import round from 'lodash/round'

export const formatAmount = (amount: number, currency: string) => {
  return `${round(amount, 2)} ${currency}`
}
