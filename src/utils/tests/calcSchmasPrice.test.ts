import { SchemaOption, SchemaType } from '../../interfaces'
import { CartItemSchema } from '../../models'
import { calcSchemasPrice, isSchemaMonetized } from '../calcSchemasPrice'

describe('Calculating Schemas Price', () => {
  test('single simple schema', () => {
    const schemas: CartItemSchema[] = [
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
    const schemas: CartItemSchema[] = [
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
    const schemas: CartItemSchema[] = [
      {
        id: 'xd',
        type: SchemaType.Select,
        value: {} as SchemaOption,
        price: 100,
        optionPrice: 999,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(1099)
  })

  test('single schema without value', () => {
    const schemas: CartItemSchema[] = [
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
    const schemas: CartItemSchema[] = [
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
    const schemas: CartItemSchema[] = [
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
    const schemas: CartItemSchema[] = [
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
    const schemas: CartItemSchema[] = [
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
        value: 'text',
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(300)
  })

  test('nested MultiplySchema type', () => {
    const schemas: CartItemSchema[] = [
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
        value: 'text',
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(1600)
  })

  test('mixed nested MultiplySchema type', () => {
    const schemas: CartItemSchema[] = [
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
        value: {} as SchemaOption,
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
        value: 'text',
        price: 100,
        optionPrice: 0,
        dependencies: [],
      },
      {
        id: 'F',
        type: SchemaType.String,
        value: 'text',
        price: 200,
        optionPrice: 0,
        dependencies: [],
      },
    ]
    expect(calcSchemasPrice(schemas)).toEqual(700)
  })

  test('MultiplySchema should throw error (no dependecies)', () => {
    const schemas: CartItemSchema[] = [
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
    const schemas: CartItemSchema[] = [
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

describe('isSchemaMonetized', () => {
  test('String', () => {
    expect(isSchemaMonetized(SchemaType.String, 'xd')).toBeTruthy()
    expect(isSchemaMonetized(SchemaType.String, '0')).toBeTruthy()
    expect(isSchemaMonetized(SchemaType.String, ' test    ')).toBeTruthy()

    expect(isSchemaMonetized(SchemaType.String, '     ')).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.String, '')).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.String, null)).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.String, false)).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.String, 0)).toBeFalsy()
  })

  test('Numeric, Multiply & MultiplySchema', () => {
    expect(isSchemaMonetized(SchemaType.Numeric, 800)).toBeTruthy()
    expect(isSchemaMonetized(SchemaType.Numeric, '100')).toBeTruthy()
    expect(isSchemaMonetized(SchemaType.Numeric, '0')).toBeTruthy()
    expect(isSchemaMonetized(SchemaType.Numeric, 0)).toBeTruthy()

    expect(isSchemaMonetized(SchemaType.Numeric, '')).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Numeric, 'test')).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Numeric, '  ')).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Numeric, NaN)).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Numeric, false)).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Numeric, null)).toBeFalsy()
  })

  test('Boolean', () => {
    expect(isSchemaMonetized(SchemaType.Boolean, true)).toBeTruthy()
    expect(isSchemaMonetized(SchemaType.Boolean, 'true')).toBeTruthy()
    expect(isSchemaMonetized(SchemaType.Boolean, 1)).toBeTruthy()
    expect(isSchemaMonetized(SchemaType.Boolean, '1')).toBeTruthy()

    expect(isSchemaMonetized(SchemaType.Boolean, false)).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Numeric, '')).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Boolean, 0)).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Boolean, null)).toBeFalsy()
  })

  test('Select', () => {
    expect(isSchemaMonetized(SchemaType.Select, {} as SchemaOption)).toBeTruthy()

    expect(isSchemaMonetized(SchemaType.Select, 'id-id-id')).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Select, 1)).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Select, '')).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Select, null)).toBeFalsy()
    expect(isSchemaMonetized(SchemaType.Select, 0)).toBeFalsy()
  })
})
