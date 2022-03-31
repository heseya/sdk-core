import { UUID } from './UUID'

export interface Setting {
  id: UUID
  name: string
  value: string
  public: boolean
  permanent: boolean
}

export type SettingCreateDto = Omit<Setting, 'id'>
export type SettingUpdateDto = SettingCreateDto

export type SettingsRecord = Record<string, string | number>
