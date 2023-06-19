import { UUID } from '../../../interfaces/UUID'
import { ListResponse } from '../../../interfaces/Response'
import { DefaultParams, PaginationParams } from './DefaultParams'

export type GetOneBySlugEntityRequest<Entity, Params extends DefaultParams = DefaultParams> = (
  slug: string,
  params?: Params,
) => Promise<Entity>

export type GetOneEntityRequest<Entity, Params extends DefaultParams = DefaultParams> = (
  id: UUID,
  params?: Params,
) => Promise<Entity>

export type GetEntityRequest<
  Entity,
  Params extends DefaultParams = DefaultParams & PaginationParams,
> = (params?: Params) => Promise<ListResponse<Entity>>

export type CreateEntityRequest<Result, EntityDto, Params extends DefaultParams = DefaultParams> = (
  entityDto: EntityDto,
  params?: Params,
) => Promise<Result>

export type CreateNestedEntityRequest<
  Result,
  EntityDto,
  Params extends DefaultParams = DefaultParams,
> = (parentId: UUID, entityDto: EntityDto, params?: Params) => Promise<Result>

export type UpdateEntityRequest<Result, EntityDto, Params extends DefaultParams = DefaultParams> = (
  id: UUID,
  entityDto: EntityDto,
  params?: Params,
) => Promise<Result>

export type UpdateNestedEntityRequest<
  Result,
  EntityDto,
  Params extends DefaultParams = DefaultParams,
> = (parentId: UUID, id: UUID, entityDto: EntityDto, params?: Params) => Promise<Result>

export type DeleteEntityRequest<Params extends DefaultParams = DefaultParams, Result = true> = (
  id: UUID,
  params?: Params,
) => Promise<Result>

export type DeleteNestedEntityRequest<
  Params extends DefaultParams = DefaultParams,
  Result = true,
> = (parentId: UUID, id: UUID, params?: Params) => Promise<Result>
