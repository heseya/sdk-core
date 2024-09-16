import { CartItemSchema } from '../../interfaces'
import { calcSchemasPrice } from '../calcSchemasPrice'

describe('Calculating Schemas Price', () => {
  test('single simple schema', () => {
    const schemas: CartItemSchema[] = [
      {
        id: 'xd',
        name: 'xd',
        value: 'w',
        optionPrice: { net: 0, gross: 0 },
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas, 'net')).toEqual(0)
  })

  test('single Select schema', () => {
    const schemas: CartItemSchema[] = [
      {
        id: 'xd',
        name: 'xd',
        value: null,
        optionPrice: { net: 999, gross: 1110 },
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas, 'net')).toEqual(999)
  })

  test('single schema without value', () => {
    const schemas: CartItemSchema[] = [
      {
        id: 'xd',
        name: 'xd',
        value: 'w',
        optionPrice: { net: 0, gross: 0 },
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas, 'net')).toEqual(0)
  })

  test('single Multiply schemas + other', () => {
    const schemas: CartItemSchema[] = [
      {
        id: 'xd',
        name: 'xd',
        value: 'some-uuid',
        optionPrice: { net: 10, gross: 12 },
        dependencies: [],
      },
      {
        id: 'xdd',
        name: 'xd',
        value: 'some-uuid-2',
        optionPrice: { net: 100, gross: 120 },
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas, 'net')).toEqual(110)
  })
})
