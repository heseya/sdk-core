import { UUID } from '../../../interfaces/UUID'
import { ListResponse } from '../../../interfaces/Response'
import { DefaultParams } from './DefaultParams'

export type getOneBySlugEntityRequest<Entity, Params extends DefaultParams = DefaultParams> = (
  slug: string,
  params?: Params,
) => Promise<Entity>

export type getOneEntityRequest<Entity, Params extends DefaultParams = DefaultParams> = (
  id: UUID,
  params?: Params,
) => Promise<Entity>

export type GetEntityRequest<Entity, Params extends DefaultParams = DefaultParams> = (
  params?: Params,
) => Promise<ListResponse<Entity>>

export type CreateEntityRequest<Entity, EntityDto, Params extends DefaultParams = DefaultParams> = (
  entityDto: EntityDto,
  params?: Params,
) => Promise<Entity>

export type UpdateEntityRequest<Entity, EntityDto, Params extends DefaultParams = DefaultParams> = (
  entityDto: EntityDto,
  params?: Params,
) => Promise<Entity>

export type DeleteEntityRequest<Params extends DefaultParams = DefaultParams> = (
  id: UUID,
  params?: Params,
) => Promise<boolean>
