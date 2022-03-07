/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminPermission, SettingsPermission } from '../../interfaces/Permissions'
import { hasAccess } from '../permissions'

// write test for hasAccess
describe('hasAccess', () => {
  it('should return true if user has permission all required permissions', () => {
    expect(hasAccess(SettingsPermission.Show)([SettingsPermission.Show])).toBe(true)
    expect(
      hasAccess([SettingsPermission.Show, AdminPermission.Login])([
        SettingsPermission.Show,
        AdminPermission.Login,
      ]),
    ).toBe(true)
    expect(
      hasAccess([SettingsPermission.Show])([SettingsPermission.Show, AdminPermission.Login]),
    ).toBe(true)
  })

  it('should return true if user has permission any of required permissions', () => {
    expect(
      hasAccess([SettingsPermission.Show, AdminPermission.Login], true)([AdminPermission.Login]),
    ).toBe(true)
    expect(
      hasAccess([SettingsPermission.Show, SettingsPermission.Add], true)([SettingsPermission.Show]),
    ).toBe(true)
  })

  it('should return false if user dont have permission', () => {
    expect(hasAccess(SettingsPermission.Show, true)([SettingsPermission.Add])).toBe(false)
    expect(
      hasAccess([AdminPermission.Login, SettingsPermission.Add], true)([SettingsPermission.Show]),
    ).toBe(false)

    expect(hasAccess(SettingsPermission.Show)([SettingsPermission.Add])).toBe(false)
    expect(
      hasAccess([AdminPermission.Login, SettingsPermission.Add])([SettingsPermission.Show]),
    ).toBe(false)
    expect(
      hasAccess([AdminPermission.Login, SettingsPermission.Show])([SettingsPermission.Show]),
    ).toBe(false)
    expect(
      hasAccess([SettingsPermission.Show, SettingsPermission.Add, AdminPermission.Login])([
        SettingsPermission.Show,
        AdminPermission.Login,
      ]),
    ).toBe(false)
    expect(
      hasAccess([SettingsPermission.Show])([SettingsPermission.Edit, AdminPermission.Login]),
    ).toBe(false)
  })

  it('should return false if invalid input', () => {
    expect(hasAccess({} as any)([null as any])).toBe(false)
    expect(hasAccess(null as any, true)([SettingsPermission.Add])).toBe(false)
    expect(hasAccess([{} as any], true)([{} as any])).toBe(false)
  })
})
