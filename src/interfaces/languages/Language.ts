import { UUID } from '../UUID'

export interface Language {
  id: UUID
  /** de, fr-CA, de-DE-1996 */
  iso: string
  name: string
  default: boolean
  hidden: boolean
}

export interface LanguageCreateDto {
  /** de, fr-CA, de-DE-1996 */
  iso: string
  name: string
  default: boolean
  hidden: boolean
}

export type LanguageUpdateDto = Partial<LanguageCreateDto>
