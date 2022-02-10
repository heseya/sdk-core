import { AxiosInstance } from 'axios'
import { HeseyaPaginationMeta } from '../../../interfaces/Response'

export type ListResponse<ListEntity> = { data: ListEntity[]; pagination: HeseyaPaginationMeta }

export interface CrudService<Entity, ListEntity = Entity, EntityDto = Entity> {
  getOne<Params = Record<string, any>>(slug: string, params?: Params): Promise<Entity>

  get<Params = Record<string, any>>(params?: Params): Promise<ListResponse<ListEntity>>

  // TODO: enable other methods
  // create(dto: EntityDto): Promise<Entity>
  // update(id: UUID, dto: EntityDto): Promise<Entity>
  // delete(id: UUID): Promise<boolean>
}

export type ServiceFactory<Service> = (axios: AxiosInstance) => Service
