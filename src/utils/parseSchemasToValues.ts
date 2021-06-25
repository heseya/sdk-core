import { isUndefined } from 'lodash'
import { Schema, SchemaType } from '../interfaces'
import { CartItemSchemaValue } from '../models'

const getDefaultFallbackForType = (schema: Schema) => {
  switch (schema.type) {
    case SchemaType.Select:
      const id = schema.options.find((option) => option.available)?.id
      if (isUndefined(id)) console.warn('[VueStore] Select Schema does not have a default value!')
      return id || ''
    case SchemaType.Boolean:
      return false
    case SchemaType.Numeric:
    case SchemaType.Multiply:
    case SchemaType.MultiplySchema:
      return 0
    case SchemaType.String:
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
      const defaultOption = schema.options.find((option) => option.id === schema.default)
      const isAvailable = defaultOption?.available ?? false
      return isAvailable ? schema.default : getDefaultFallbackForType(schema)
    default:
      return schema.default
  }
}

export const parseSchemasToValues = (schemas: Schema[]): CartItemSchemaValue[] =>
  schemas.map((schema) => {
    const defaultValue = parseDefaultValue(schema) || getDefaultFallbackForType(schema)

    const optionPrice =
      schema.type === SchemaType.Select
        ? schema.options.find((s) => s.id === defaultValue)?.price || 0
        : 0

    return {
      id: schema.id,
      type: schema.type,
      dependencies: schema.used_schemas,
      name: schema.name,
      price: schema.price,
      optionPrice,
      value: defaultValue,
    }
  })
