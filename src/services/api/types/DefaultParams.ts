// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultParams = Record<string, any>

export interface SearchParam {
  /**
   * Full text search
   */
  search?: string
}

export interface PaginationParams {
  /**
   * Number of items per page
   */
  limit?: number

  /**
   * Selected active page
   */
  page?: number
}

export interface MetadataParams {
  /**
   * Allows to filter by public metadata fields
   * @example ?metadata.key=value
   */
  metadata?: { [metadataName: string]: string | number | boolean }

  /**
   * Allows to filter by private metadata fields
   * @example ?metadata_private.key=value
   */
  metadata_private?: { [metadataName: string]: string | number | boolean }
}
