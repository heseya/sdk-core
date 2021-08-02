import { toPrecision } from '../amounts'

describe('toPrecision', () => {
  it('should return correct precision of 0', () => {
    expect(toPrecision(1, 0)).toBe(1)
  })

  it('should return correct precision of 2', () => {
    expect(toPrecision(1, 2)).toBe(1.0)
  })

  it('should return correct precision of 2', () => {
    expect(toPrecision(1.1, 2)).toBe(1.1)
  })

  it('should return correct precision of 2', () => {
    expect(toPrecision(1.123, 2)).toBe(1.12)
  })

  it('should return correct precision of 3', () => {
    expect(toPrecision(1.1234, 3)).toBe(1.123)
  })

  it('should return correct precision of 4', () => {
    expect(toPrecision(1.12345, 4)).toBe(1.1234)
  })
})
