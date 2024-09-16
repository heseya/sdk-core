import { CartItemSchema } from '../interfaces/CartItem'
import { getDependenciesTree } from './tree'

const ERROR_MESSAGES = {
  dependecyLoop: 'Dependecy Loop in MuliplySchema',
  calcLoop: 'Infinite loop while calculating CartItem price',
  noDependecies: 'MultiplySchema does not have any dependecies!',
}

export interface CartItemSchemaWithDependecies extends CartItemSchema {
  children: CartItemSchemaWithDependecies[]
}

export const calcSchemasPrice = (
  schemas: CartItemSchema[],
  priceType: 'gross' | 'net' = 'gross',
): number => {
  const dependeciedSchemas = getDependenciesTree(schemas)

  if (dependeciedSchemas.length === 0 && schemas.length > 0)
    throw new Error(ERROR_MESSAGES.dependecyLoop)

  return dependeciedSchemas.reduce((sum, schema) => sum + schema.optionPrice[priceType], 0)
}
