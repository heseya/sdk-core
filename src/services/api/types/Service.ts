import { AxiosInstance } from 'axios'
import { HeseyaPaginationMeta } from '../../../interfaces/Response'

export type ListResponse<ListEntity> = { data: ListEntity[]; pagination: HeseyaPaginationMeta }

type Params = Record<string, any>

// Universal crud service definition, can be used if we dont want to specify any specific typing behaviours
export interface CrudService<Entity, ListEntity = Entity, EntityDto = Entity> {
  get(params?: Params): Promise<ListResponse<ListEntity>>

  getOne(slug: string, params?: Params): Promise<Entity>

  getOneById(id: string, params?: Params): Promise<Entity>

  // TODO: enable other methods
  // create(dto: EntityDto): Promise<Entity>
  // update(id: UUID, dto: EntityDto): Promise<Entity>
  // delete(id: UUID): Promise<boolean>
}

export type ServiceFactory<Service> = (axios: AxiosInstance) => Service
