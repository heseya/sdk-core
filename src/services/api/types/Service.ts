import { AxiosInstance } from 'axios'
import { HeseyaPaginationMeta } from '../../../interfaces/Response'

export interface CrudService<Entity, ListEntity = Entity, EntityDto = Entity> {
  getOne(slug: string, params?: Record<string, any>): Promise<Entity>

  get(
    params: Record<string, any>,
  ): Promise<{ data: ListEntity[]; pagination: HeseyaPaginationMeta }>

  // TODO: enable other methods
  // create(dto: EntityDto): Promise<Entity>
  // update(id: UUID, dto: EntityDto): Promise<Entity>
  // delete(id: UUID): Promise<boolean>
}

export type ServiceFactory<Service> = (axios: AxiosInstance) => Service
