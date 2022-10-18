export enum AuthProviderKey {
  Google = 'google',
  Apple = 'apple',
  Facebook = 'facebook',
  GitHub = 'github',
  GitLab = 'gitlab',
  Bitbucket = 'bitbucket',
  LinkedIn = 'linkedin',
}

export interface AuthProviderList {
  key: AuthProviderKey
  active: boolean
}

export interface AuthProvider extends AuthProviderList {
  client_id: string | null
  client_secret: string | null
}

export interface AuthProviderUpdateDto {
  client_id: string | null
  client_secret: string | null
  active: boolean
}
