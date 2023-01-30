export type Metadata = Record<string, string | number | boolean>

export type MetadataCreateDto = Record<string, string | number | boolean | undefined>

export type MetadataUpdateDto = Record<string, string | number | boolean | null | undefined>

export interface MetadataFields {
  metadata: Metadata
  metadata_private?: Metadata
}

export interface CreateMetadataFields {
  metadata?: MetadataCreateDto
  metadata_private?: MetadataCreateDto
}
