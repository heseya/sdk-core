import { Schema } from '../interfaces'
import { CartItemSchema } from '../interfaces/CartItem'

const parseSchemaToCartItemSchema = (schema: Schema): CartItemSchema => {
  const defaultOption = schema.options.find((s) => s.default)

  return {
    id: schema.id,
    dependencies: schema.used_schemas,
    name: schema.name,
    optionPrice: {
      net: parseFloat(defaultOption?.price?.net ?? '0'),
      gross: parseFloat(defaultOption?.price?.gross ?? '0'),
    },
    value: defaultOption?.id ?? null,
  }
}

export const parseSchemasToCartItemSchemas = (schemas: Schema[]): CartItemSchema[] =>
  schemas.map(parseSchemaToCartItemSchema)
