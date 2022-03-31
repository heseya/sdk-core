export type Metadata = Record<string, string | number | boolean>

export type MetadataDto = Record<string, string | number | boolean | null>

export interface MetadataFields {
  metadata: Metadata
  metadata_private?: Metadata
}

export interface CreateMetadataFields {
  metadata?: Metadata
  metadata_private?: Metadata
}
