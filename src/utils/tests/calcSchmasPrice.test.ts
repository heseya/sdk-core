import { SchemaOption, CartItemSchema } from '../../interfaces'
import { calcSchemasPrice } from '../calcSchemasPrice'

describe('Calculating Schemas Price', () => {
  test('single simple schema', () => {
    const schemas: CartItemSchema[] = [
      {
        id: 'xd',
        name: 'xd',
        value: 'w',
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(0)
  })

  test('single Select schema', () => {
    const schemas: CartItemSchema[] = [
      {
        id: 'xd',
        name: 'xd',
        value: {} as SchemaOption,
        optionPrice: 999,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(999)
  })

  test('single schema without value', () => {
    const schemas: CartItemSchema[] = [
      {
        id: 'xd',
        name: 'xd',
        value: 'w',
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(0)
  })

  test('single Multiply schemas + other', () => {
    const schemas: CartItemSchema[] = [
      {
        id: 'xd',
        name: 'xd',
        value: 3,
        optionPrice: 10,
        dependencies: [],
      },
      {
        id: 'xdd',
        name: 'xd',
        value: true,
        optionPrice: 100,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(110)
  })
})
