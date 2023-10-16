import { UUID } from './UUID'

export type RedirectType = 301 | 302 | 307 | 308

export interface Redirect {
  id: UUID
  /**
   * Internal name of the redirect. Admin only.
   */
  name: string
  type: RedirectType
  /**
   * Internal url to be redirected
   * Can hold a variables in parentheses {}
   * @example /old-url/{var1}
   */
  source_url: string
  /**
   * URL to which the source_url will be redirected
   * Can be either a relative or absolute URL
   * @example /new-url/{var1}|https://example.com/new-url/{var1}
   */
  target_url: string
  /**
   * If false, redirect should not be used
   */
  enabled: boolean
}

export interface RedirectCreateDto {
  name: string
  type: RedirectType
  source_url: string
  target_url: string
  enabled: boolean
}

export type RedirectUpdateDto = Partial<RedirectCreateDto>
