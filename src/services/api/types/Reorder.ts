import { UUID } from '../../../interfaces/UUID'
import { DefaultParams } from './DefaultParams'

export type ReorderEntityRequest<Params extends DefaultParams = DefaultParams> = (
  ids: UUID[],
  params?: Params,
) => Promise<true>
