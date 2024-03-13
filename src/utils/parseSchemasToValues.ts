import { Schema, SchemaType } from '../interfaces'
import { CartItemSchema, CartItemSchemaValue } from '../interfaces/CartItem'
import { parsePrices } from './parsePrice'
import { isUndefined } from './utils'

export const parseSchemasToValues = (schemas: Schema[], currency: string): CartItemSchema[] =>
  schemas.map((schema) => {
    const optionPrice = parsePrices(
      schema.options.find((s) => s.id === schema.default)?.prices || [],
      currency,
    )

    return {
      id: schema.id,
      dependencies: schema.used_schemas,
      name: schema.name,
      optionPrice,
      value: schema.default,
    }
  })
