import arrayToTree from 'array-to-tree'
import { SchemaType } from '../interfaces'
import { CartItemSchemaValue } from '../models'

// ? Infinite loop prevention
let calcCallCounter = 0

const ERROR_MESSAGES = {
  dependecyLoop: 'Dependecy Loop in MuliplySchema',
  calcLoop: 'Infinite loop while calculating CartItem price',
  noDependecies: 'MultiplySchema does not have any dependecies!',
}

export interface SchemaValueWithDependecies extends CartItemSchemaValue {
  children: SchemaValueWithDependecies[]
}

export const calcSchemasPrice = (schemas: CartItemSchemaValue[]): number => {
  calcCallCounter = 0

  const dependeciedSchemas = getDependenciesTree(schemas)

  if (dependeciedSchemas.length === 0 && schemas.length > 0)
    throw new Error(ERROR_MESSAGES.dependecyLoop)

  return dependeciedSchemas.reduce((sum, schema) => {
    return sum + calcSingleSchemaPrice(schema)
  }, 0)
}

const calcSingleSchemaPrice = (schema: SchemaValueWithDependecies): number => {
  // ? Infinite loop prevention
  if (++calcCallCounter >= 2000) throw new Error(ERROR_MESSAGES.calcLoop)

  if (!schema.value) return 0

  if (schema.type === SchemaType.MultiplySchema) {
    if (!schema.children[0]) throw new Error(ERROR_MESSAGES.noDependecies)

    return Number(schema.value) * calcSingleSchemaPrice(schema.children[0])
  }

  const schemaPrice =
    schema.type == SchemaType.Multiply ? Number(schema.value) * schema.price : schema.price

  return schema.type === SchemaType.Select ? schemaPrice + (schema.optionPrice || 0) : schemaPrice
}

const getDependenciesTree = (schemas: CartItemSchemaValue[]): SchemaValueWithDependecies[] => {
  // Converting children ids to parents ids
  const data = [...schemas].map((schema) => {
    const parents = schemas
      .filter(({ dependencies }) => dependencies.some((id) => id === schema.id))
      .map(({ id }) => id)

    // TODO: currently supporting only one child dependecy
    return { ...schema, parentId: parents[0], children: [] }
  })

  return arrayToTree(data, {
    parentProperty: 'parentId',
  })
}
