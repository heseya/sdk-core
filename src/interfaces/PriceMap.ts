import { UUID } from './UUID'

// TODO: Implement PriceMap interface
export interface PriceMapListed {
  id: UUID
  name: string
}

export type PriceMap = PriceMapListed

export interface PriceMapCreateDto {
  name: string
}

export type PriceMapUpdateDto = Partial<PriceMapCreateDto>
