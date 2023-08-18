import { isUndefined } from 'lodash'
import { Schema, SchemaType } from '../interfaces'
import { CartItemSchema, CartItemSchemaValue } from '../interfaces/CartItem'
import { parsePrices } from './parsePrice'

const getDefaultFallbackForType = (schema: Schema): CartItemSchemaValue => {
  switch (schema.type) {
    case SchemaType.Select:
      const id = schema.options.find((option) => option.available)?.id
      // eslint-disable-next-line no-console
      if (isUndefined(id)) console.warn('[VueStore] Select Schema does not have a default value!')
      return id || ''
    case SchemaType.Boolean:
      return false
    case SchemaType.Numeric:
    case SchemaType.Multiply:
    case SchemaType.MultiplySchema:
      return 0
    case SchemaType.String:
    // TODO: is Date & File works properly?
    case SchemaType.Date:
    case SchemaType.File:
      return ''
  }
}

const parseDefaultValue = (schema: Schema) => {
  if (!schema.default) return undefined

  switch (schema.type) {
    case SchemaType.Numeric:
      // Default value for number comes as string
      return +schema.default
    case SchemaType.Boolean:
      // Default value for boolean comes as string
      return !!+schema.default
    case SchemaType.Select:
      const defaultOption = schema.options[parseInt(schema.default)]
      const isAvailable = defaultOption?.available ?? false
      return isAvailable ? defaultOption.id : undefined
    default:
      return schema.default
  }
}

export const parseSchemasToValues = (schemas: Schema[], currency: string): CartItemSchema[] =>
  schemas.map((schema) => {
    /**
     * If schema is required, we need to set a default value no matter what.
     */
    const fallbackDefault = schema.required ? getDefaultFallbackForType(schema) : undefined
    const defaultValue = parseDefaultValue(schema) ?? fallbackDefault

    const optionPrice =
      schema.type === SchemaType.Select
        ? parsePrices(schema.options.find((s) => s.id === defaultValue)?.prices || [], currency)
        : 0

    return {
      id: schema.id,
      type: schema.type,
      dependencies: schema.used_schemas,
      name: schema.name,
      price: parsePrices(schema.prices, currency),
      optionPrice,
      value: defaultValue,
    }
  })
