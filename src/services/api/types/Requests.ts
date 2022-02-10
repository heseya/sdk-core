import { UUID } from '../../../interfaces/UUID'
import { HeseyaPaginationMeta } from '../../../interfaces/Response'
import { DefaultParams } from './DefaultParams'

export type ListResponse<ListEntity> = { data: ListEntity[]; pagination: HeseyaPaginationMeta }

export type GetOneEntityRequest<Entity, Params = DefaultParams> = (
  id: string,
  params?: Params,
) => Promise<Entity>

export type GetEntityRequest<Entity, Params = DefaultParams> = (
  params?: Params,
) => Promise<ListResponse<Entity>>

export type CreateEntityRequest<Entity, EntityDto, Params = DefaultParams> = (
  entityDto: EntityDto,
  params?: Params,
) => Promise<Entity[]>

export type UpdateEntityRequest<Entity, EntityDto, Params = DefaultParams> = (
  entityDto: EntityDto,
  params?: Params,
) => Promise<Entity[]>

export type DeleteEntityRequest<Params = DefaultParams> = (
  id: UUID,
  params?: Params,
) => Promise<boolean>
