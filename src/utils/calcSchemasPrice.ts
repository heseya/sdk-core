import { SchemaType } from '../interfaces'
import { CartItemSchema, CartItemSchemaValue } from '../interfaces/CartItem'
import { getDependenciesTree } from './tree'
import { isNumber, isString } from './utils'

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

/**
 * Checks whether the scheme value is correct and indicates whether the scheme should be included in the product price
 */
export const isSchemaMonetized = (schemaType: SchemaType, value: CartItemSchemaValue): boolean => {
  switch (schemaType) {
    case SchemaType.String:
    case SchemaType.Date:
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
    case SchemaType.File:
      // TODO: check real type in it (Not sure if this is ID or SchemaOption object)
      return !!value
  }
}

const calcSingleSchemaPrice = (schema: CartItemSchemaWithDependecies): number => {
  // ? Infinite loop prevention
  if (++calcCallCounter >= 2000) throw new Error(ERROR_MESSAGES.calcLoop)

  if (!isSchemaMonetized(schema.type, schema.value)) return 0

  if (schema.type === SchemaType.MultiplySchema) {
    if (!schema.children[0]) throw new Error(ERROR_MESSAGES.noDependecies)

    return Number(schema.value) * calcSingleSchemaPrice(schema.children[0])
  }

  const schemaPrice =
    schema.type == SchemaType.Multiply ? Number(schema.value) * schema.price : schema.price

  return schema.type === SchemaType.Select ? schemaPrice + (schema.optionPrice || 0) : schemaPrice
}
