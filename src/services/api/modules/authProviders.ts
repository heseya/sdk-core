import { CrudService, ServiceFactory } from '../types/Service'
import { createGetListRequest, createGetOneRequest, createPatchRequest } from '../utils/requests'

import {
  AuthProvider,
  AuthProviderKey,
  AuthProviderList,
  AuthProviderUpdateDto,
} from '../../../interfaces/AuthProviders'
import { AuthResponse, HeseyaAuthResponse } from '../../../interfaces/Auth'

type AuthProvidersListParams = { active?: boolean }

export type AuthProvidersService = Omit<
  CrudService<
    AuthProvider,
    AuthProviderList,
    never,
    AuthProviderUpdateDto,
    AuthProvidersListParams
  >,
  'create' | 'getOneBySlug' | 'delete'
> & {
  /**
   * If the user does not exist, he is registered, otherwise he is logged in.
   *
   * For user are generated tokens and he is returned
   *
   * @param providerKey - Provider key
   * @param payload - Data from provider, that was returned after redirect via query string
   */
  login(provider: AuthProviderKey, payload: Record<string, unknown>): Promise<AuthResponse>

  /**
   * Creates a url to redirect the user to the provider login page.
   */
  redirect(provider: AuthProviderKey, returnUrl: string): Promise<string>
}

export const createAuthProvidersService: ServiceFactory<AuthProvidersService> = (axios) => {
  const route = 'auth/providers'
  return {
    login: async (provider, payload) => {
      const {
        data: { data },
      } = await axios.post<{ data: HeseyaAuthResponse }>(`${route}/${provider}/login`, payload)
      return {
        user: data.user,
        accessToken: data.token,
        identityToken: data.identity_token,
        refreshToken: data.refresh_token,
      }
    },

    redirect: async (provider, returnUrl) => {
      const {
        data: { data },
      } = await axios.post<{ data: { redirect_url: string } }>(`${route}/${provider}/redirect`, {
        return_url: returnUrl,
      })
      return data.redirect_url
    },

    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    update: createPatchRequest(axios, route),
  }
}
