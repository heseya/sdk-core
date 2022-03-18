import { UUID } from './UUID'

export interface PackagesTemplate {
  id: UUID
  name: string
  wieght: number
  width: number
  height: number
  depth: number
}

export type PackagesTemplateDto = Omit<PackagesTemplate, 'id'>
