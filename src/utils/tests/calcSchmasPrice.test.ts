import { SchemaType } from '../../interfaces'
import { CartItemSchemaValue } from '../../models'
import { calcSchemasPrice } from '../calcSchemasPrice'

describe('Calculating Schemas Price', () => {
  test('single simple schema', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'xd',
        type: SchemaType.String,
        value: 'w',
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(100)
  })

  test('single simple schema (ignoring optionPrice when no select)', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'xd',
        type: SchemaType.String,
        value: 'w',
        price: 100,
        optionPrice: 999,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(100)
  })

  test('single Select schema', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'xd',
        type: SchemaType.Select,
        value: 'w',
        price: 100,
        optionPrice: 999,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(1099)
  })

  test('single schema without value', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'xd',
        type: SchemaType.String,
        value: 'w',
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(100)
  })

  test('multiple simple schemas', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'xd',
        type: SchemaType.String,
        value: 'w',
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
      {
        id: 'xdd',
        type: SchemaType.Numeric,
        value: 23,
        price: 99,
        optionPrice: 0,
        dependencies: [],
      },
      {
        id: 'xdd',
        type: SchemaType.Boolean,
        value: false,
        price: 1000,
        optionPrice: 0,
        dependencies: [],
      },
      {
        id: 'xdd',
        type: SchemaType.Boolean,
        value: true,
        price: 1000,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(1199)
  })

  test('single Multiply schemas', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'xd',
        type: SchemaType.Multiply,
        value: 3,
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(300)
  })

  test('single Multiply schemas + other', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'xd',
        type: SchemaType.Multiply,
        value: 3,
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
      {
        id: 'xdd',
        type: SchemaType.Boolean,
        value: true,
        price: 1000,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(1300)
  })

  /**
   * ? MULTIPLY SCHEMA
   */

  test('MultiplySchema type', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'A',
        type: SchemaType.MultiplySchema,
        value: 3,
        price: 0,
        optionPrice: 0,
        dependencies: ['B'],
      },
      {
        id: 'B',
        type: SchemaType.String,
        value: true,
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(300)
  })

  test('nested MultiplySchema type', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'A',
        type: SchemaType.MultiplySchema,
        value: 2,
        price: 0,
        optionPrice: 0,
        dependencies: ['B'],
      },
      {
        id: 'B',
        type: SchemaType.MultiplySchema,
        value: 2,
        price: 0,
        optionPrice: 0,
        dependencies: ['C'],
      },
      {
        id: 'C',
        type: SchemaType.MultiplySchema,
        value: 2,
        price: 0,
        optionPrice: 0,
        dependencies: ['D'],
      },
      {
        id: 'D',
        type: SchemaType.MultiplySchema,
        value: 2,
        price: 0,
        optionPrice: 0,
        dependencies: ['E'],
      },
      {
        id: 'E',
        type: SchemaType.String,
        value: true,
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(1600)
  })

  test('mixed nested MultiplySchema type', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'A',
        type: SchemaType.MultiplySchema,
        value: 1,
        price: 0,
        optionPrice: 0,
        dependencies: ['B'],
      },
      {
        id: 'B',
        type: SchemaType.MultiplySchema,
        value: 2,
        price: 0,
        optionPrice: 0,
        dependencies: ['C'],
      },
      {
        id: 'C',
        type: SchemaType.Select,
        value: 2,
        price: 50,
        optionPrice: 100,
        dependencies: [],
      },
      {
        id: 'D',
        type: SchemaType.MultiplySchema,
        value: 2,
        price: 0,
        optionPrice: 0,
        dependencies: ['E'],
      },
      {
        id: 'E',
        type: SchemaType.String,
        value: true,
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
      {
        id: 'F',
        type: SchemaType.String,
        value: true,
        price: 200,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(700)
  })

  test('MultiplySchema should throw error (no dependecies)', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'A',
        type: SchemaType.MultiplySchema,
        value: 3,
        price: 0,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(() => {
      calcSchemasPrice(schemas)
    }).toThrowError()
  })

  test('MultiplySchema should throw error (infinite loop)', () => {
    const schemas: CartItemSchemaValue[] = [
      {
        id: 'A',
        type: SchemaType.MultiplySchema,
        value: 3,
        price: 0,
        optionPrice: 0,
        dependencies: ['B'],
      },
      {
        id: 'B',
        type: SchemaType.MultiplySchema,
        value: 3,
        price: 0,
        optionPrice: 0,
        dependencies: ['A'],
      },
    ]
    expect(() => {
      calcSchemasPrice(schemas)
    }).toThrowError()
  })
})
