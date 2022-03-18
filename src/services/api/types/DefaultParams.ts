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
  metadata?: { [metadataName: string]: string | number | boolean }
  metadata_private?: { [metadataName: string]: string | number | boolean }
}
