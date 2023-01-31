import { CrudService, ServiceFactory } from '../../types/Service'
import { createGetListRequest, createGetOneRequest, createPatchRequest } from '../../utils/requests'

import {
  AuthProvider,
  AuthProviderKey,
  AuthProviderList,
  AuthProviderUpdateDto,
} from '../../../../interfaces/AuthProviders'
import { AuthResponse, HeseyaAuthResponse } from '../../../../interfaces/Auth'
import { HeseyaResponse } from '../../../../interfaces'

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
   * Can throw CLIENT_ALREADY_HAS_ACCOUNT error, in that case you should use `.Auth.Providers.mergeAccount()` method to merge accounts
   *
   * @param providerKey - Provider key
   * @param returnUrl - Full URL to which the user was redirected after returning from the provider
   */
  login(provider: AuthProviderKey, returnUrl: string): Promise<AuthResponse>

  /**
   * Creates a url to redirect the user to the provider login page.
   *
   * @param providerKey - Provider key
   * @param returnUrl - URL to which the user should be redirected after authorization
   */
  redirect(provider: AuthProviderKey, returnUrl: string): Promise<string>

  /**
   * Merges currently logged account with account from provider. Both accounts must have the same email.
   *
   * @param mergeToken - token throwed by `.Auth.Providers.login()` method in error body when CLIENT_ALREADY_HAS_ACCOUNT
   */
  mergeAccount(mergeToken: string): Promise<true>
}

export const createAuthProvidersService: ServiceFactory<AuthProvidersService> = (axios) => {
  const route = 'auth/providers'
  return {
    login: async (provider, returnUrl) => {
      const {
        data: { data },
      } = await axios.post<HeseyaResponse<HeseyaAuthResponse>>(`${route}/${provider}/login`, {
        return_url: returnUrl,
      })
      return {
        user: data.user,
        accessToken: data.token,
        identityToken: data.identity_token,
        refreshToken: data.refresh_token,
      }
    },

    redirect: async (provider, returnUrl) => {
      const { data } = await axios.post<HeseyaResponse<{ redirect_url: string }>>(
        `${route}/${provider}/redirect`,
        {
          return_url: returnUrl,
        },
      )
      return data.data.redirect_url
    },

    mergeAccount: async (mergeToken) => {
      await axios.post(`${route}/merge-account`, {
        merge_token: mergeToken,
      })
      return true
    },

    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: false }),
    update: createPatchRequest(axios, route, { byId: false }),
  }
}
