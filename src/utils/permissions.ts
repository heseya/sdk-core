import { Permission } from '../interfaces/Permissions'

/**
 * Checks if the user has the permission to perform the action
 * @param anyOfRequired - if true, the user must have only one of the required permissions to have access, else it needs all of them
 */
export const hasAccess =
  (required: Permission | Permission[], anyOfRequired = false) =>
  (userPermissions: Permission[]): boolean => {
    const requiredArray = Array.isArray(required) ? required : [required]

    const callback = (requiredPermission: Permission) =>
      userPermissions.includes(requiredPermission)

    return anyOfRequired ? requiredArray.some(callback) : requiredArray.every(callback)
  }
