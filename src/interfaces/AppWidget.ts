import { Permission } from './Permissions'
import { UUID } from './UUID'

export interface AppWidget {
  id: UUID
  name: string
  url: string
  section: string
  permissions: Permission[]
}

export interface AppWidgetCreateDto {
  name: string
  url: string
  section: string
  permissions: Permission[]
}

export type AppWidgetUpdateDto = Partial<AppWidgetCreateDto>
