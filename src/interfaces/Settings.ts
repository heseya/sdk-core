import { UUID } from './UUID'

export interface Setting {
  id: UUID
  name: string
  value: string
  public: boolean
  permanent: boolean
}

export type SettingDto = Omit<Setting, 'id'>

export type SettingsRecord = Record<string, string | number>
