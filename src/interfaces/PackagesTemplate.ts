import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UUID } from './UUID'

/**
 * @deprecated Package templates will be removed in 6.0 release
 */
export interface PackagesTemplate extends MetadataFields {
  id: UUID
  name: string
  weight: number
  width: number
  height: number
  depth: number
}

/**
 * @deprecated Package templates will be removed in 6.0 release
 */
export type PackagesTemplateCreateDto = Omit<PackagesTemplate, 'id' | keyof MetadataFields> &
  CreateMetadataFields

/**
 * @deprecated Package templates will be removed in 6.0 release
 */
export type PackagesTemplateUpdateDto = Omit<PackagesTemplateCreateDto, keyof CreateMetadataFields>
