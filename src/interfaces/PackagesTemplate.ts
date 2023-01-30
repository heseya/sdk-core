import { CreateMetadataFields, MetadataFields } from './Metadata'
import { UUID } from './UUID'

export interface PackagesTemplate extends MetadataFields {
  id: UUID
  name: string
  weight: number
  width: number
  height: number
  depth: number
}

export type PackagesTemplateCreateDto = Omit<PackagesTemplate, 'id' | keyof MetadataFields> &
  CreateMetadataFields

export type PackagesTemplateUpdateDto = Omit<PackagesTemplateCreateDto, keyof CreateMetadataFields>
