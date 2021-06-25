import test from 'ava'

import { SchemaType } from '../../interfaces'
import { CartItemSchemaValue } from '../../models'
import { calcSchemasPrice } from '../calcSchemasPrice'

test('single simple schema', (t) => {
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

  t.is(calcSchemasPrice(schemas), 100)
})

test('single simple schema (ignoring optionPrice when no select)', (t) => {
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

  t.is(calcSchemasPrice(schemas), 100)
})

test('single Select schema', (t) => {
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

  t.is(calcSchemasPrice(schemas), 1099)
})

test('single schema without value', (t) => {
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

  t.is(calcSchemasPrice(schemas), 100)
})

test('multiple simple schemas', (t) => {
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

  t.is(calcSchemasPrice(schemas), 1199)
})

test('single Multiply schemas', (t) => {
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

  t.is(calcSchemasPrice(schemas), 300)
})

test('single Multiply schemas + other', (t) => {
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

  t.is(calcSchemasPrice(schemas), 1300)
})

/**
 * ? MULTIPLY SCHEMA
 */

test('MultiplySchema type', (t) => {
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

  t.is(calcSchemasPrice(schemas), 300)
})

test('nested MultiplySchema type', (t) => {
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

  t.is(calcSchemasPrice(schemas), 1600)
})

test('mixed nested MultiplySchema type', (t) => {
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

  t.is(calcSchemasPrice(schemas), 700)
})

test('MultiplySchema should throw error (no dependecies)', (t) => {
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

  t.throws(() => {
    calcSchemasPrice(schemas)
  })
})

test('MultiplySchema should throw error (infinite loop)', (t) => {
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

  t.throws(() => {
    calcSchemasPrice(schemas)
  })
})
