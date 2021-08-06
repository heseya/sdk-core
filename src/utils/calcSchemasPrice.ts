import { isNumber, isObject, isString } from 'lodash'
import { SchemaType } from '../interfaces'
import { CartItemSchema, CartItemSchemaValue } from '../models'
import { getDependenciesTree } from './tree'

// ? Infinite loop prevention
let calcCallCounter = 0

const ERROR_MESSAGES = {
  dependecyLoop: 'Dependecy Loop in MuliplySchema',
  calcLoop: 'Infinite loop while calculating CartItem price',
  noDependecies: 'MultiplySchema does not have any dependecies!',
}

export interface CartItemSchemaWithDependecies extends CartItemSchema {
  children: CartItemSchemaWithDependecies[]
}

export const calcSchemasPrice = (schemas: CartItemSchema[]): number => {
  calcCallCounter = 0

  const dependeciedSchemas = getDependenciesTree(schemas)

  if (dependeciedSchemas.length === 0 && schemas.length > 0)
    throw new Error(ERROR_MESSAGES.dependecyLoop)

  return dependeciedSchemas.reduce((sum, schema) => {
    return sum + calcSingleSchemaPrice(schema)
  }, 0)
}

export const isSchemaValueTruthy = (
  schemaType: SchemaType,
  value: CartItemSchemaValue,
): boolean => {
  switch (schemaType) {
    case SchemaType.String:
      return isString(value) && value.trim().length > 0
    case SchemaType.Numeric:
    case SchemaType.MultiplySchema:
    case SchemaType.Multiply:
      if (isNumber(value)) return !isNaN(value)
      if (isString(value)) return value.trim().length > 0 && !isNaN(Number(value))
      return false
    case SchemaType.Boolean:
      return value === true || value === 'true' || value === 1 || value === '1'
    case SchemaType.Select:
      return isObject(value)
  }
}

const calcSingleSchemaPrice = (schema: CartItemSchemaWithDependecies): number => {
  // ? Infinite loop prevention
  if (++calcCallCounter >= 2000) throw new Error(ERROR_MESSAGES.calcLoop)

  if (!isSchemaValueTruthy(schema.type, schema.value)) return 0

  if (schema.type === SchemaType.MultiplySchema) {
    if (!schema.children[0]) throw new Error(ERROR_MESSAGES.noDependecies)

    return Number(schema.value) * calcSingleSchemaPrice(schema.children[0])
  }

  const schemaPrice =
    schema.type == SchemaType.Multiply ? Number(schema.value) * schema.price : schema.price

  return schema.type === SchemaType.Select ? schemaPrice + (schema.optionPrice || 0) : schemaPrice
}
