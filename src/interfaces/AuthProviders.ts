export enum AuthProviderKey {
  Google = 'google',
  Apple = 'apple',
  Facebook = 'facebook',
  GitHub = 'github',
  GitLab = 'gitlab',
  Bitbucket = 'bitbucket',
  LinkedIn = 'linkedin',
}

export interface AuthProviderListed {
  key: AuthProviderKey
  active: boolean
}
/**
 * @deprecated use AuthProviderListed instead
 */
export type AuthProviderList = AuthProviderListed

export interface AuthProvider extends AuthProviderListed {
  client_id: string | null
  client_secret: string | null
}

export interface AuthProviderUpdateDto {
  client_id: string | null
  client_secret: string | null
  active: boolean
}
