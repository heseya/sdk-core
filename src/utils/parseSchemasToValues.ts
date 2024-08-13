import { Schema } from '../interfaces'
import { CartItemSchema } from '../interfaces/CartItem'
import { parsePrices } from './parsePrice'

export const parseSchemasToValues = (schemas: Schema[], currency: string): CartItemSchema[] =>
  schemas.map((schema) => {
    const option = schema.options.find((s) => s.id === schema.default)

    // TODO: remove deprecated parsePrices
    const optionPrice = option?.price?.gross
      ? parseInt(option?.price?.gross)
      : parsePrices(option?.prices || [], currency)

    return {
      id: schema.id,
      dependencies: schema.used_schemas,
      name: schema.name,
      optionPrice,
      value: schema.default,
    }
  })
