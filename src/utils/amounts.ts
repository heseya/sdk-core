export const formatAmount = (amount: number, currency: string) => {
  return `${toPrecision(amount, 2)} ${currency}`
}

export const toPrecision = (value: number, precision = 2): number =>
  Math.round(value * 10 ** precision) / 10 ** precision
