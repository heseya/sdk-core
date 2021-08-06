import { SchemaOption, SchemaType } from '../../interfaces'
import { CartItemSchemaValue } from '../../models'
import { calcSchemasPrice, isSchemaValueTruthy } from '../calcSchemasPrice'

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
        value: {} as SchemaOption,
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
        value: 'text',
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
        value: 'text',
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

describe('isSchemaValueTruthy', () => {
  test('String', () => {
    expect(isSchemaValueTruthy(SchemaType.String, 'xd')).toBeTruthy()
    expect(isSchemaValueTruthy(SchemaType.String, '0')).toBeTruthy()
    expect(isSchemaValueTruthy(SchemaType.String, ' test    ')).toBeTruthy()

    expect(isSchemaValueTruthy(SchemaType.String, '     ')).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.String, '')).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.String, null)).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.String, false)).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.String, 0)).toBeFalsy()
  })

  test('Numeric, Multiply & MultiplySchema', () => {
    expect(isSchemaValueTruthy(SchemaType.Numeric, 800)).toBeTruthy()
    expect(isSchemaValueTruthy(SchemaType.Numeric, '100')).toBeTruthy()
    expect(isSchemaValueTruthy(SchemaType.Numeric, '0')).toBeTruthy()
    expect(isSchemaValueTruthy(SchemaType.Numeric, 0)).toBeTruthy()

    expect(isSchemaValueTruthy(SchemaType.Numeric, '')).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Numeric, 'test')).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Numeric, '  ')).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Numeric, NaN)).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Numeric, false)).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Numeric, null)).toBeFalsy()
  })

  test('Boolean', () => {
    expect(isSchemaValueTruthy(SchemaType.Boolean, true)).toBeTruthy()
    expect(isSchemaValueTruthy(SchemaType.Boolean, 'true')).toBeTruthy()
    expect(isSchemaValueTruthy(SchemaType.Boolean, 1)).toBeTruthy()
    expect(isSchemaValueTruthy(SchemaType.Boolean, '1')).toBeTruthy()

    expect(isSchemaValueTruthy(SchemaType.Boolean, false)).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Numeric, '')).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Boolean, 0)).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Boolean, null)).toBeFalsy()
  })

  test('Select', () => {
    expect(isSchemaValueTruthy(SchemaType.Select, {} as SchemaOption)).toBeTruthy()

    expect(isSchemaValueTruthy(SchemaType.Select, 'id-id-id')).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Select, 1)).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Select, '')).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Select, null)).toBeFalsy()
    expect(isSchemaValueTruthy(SchemaType.Select, 0)).toBeFalsy()
  })
})
