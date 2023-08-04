import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import {
  HeseyaResponse,
  User,
  UserConsentDto,
  UserPreferences,
  UserRegisterDto,
} from '../../../../interfaces'
import { HeseyaAuthResponse } from '../../../../interfaces/Auth'

import { createAuthService } from '../auth'
import { META_LANGUAGE } from '../../../../../test/mock/responseMeta'

const dummyAuth: { data: HeseyaAuthResponse } = {
  data: {
    user: {
      id: '1',
      name: 'Test user',
      email: 'a@test.pl',
      avatar: '',
      is_tfa_active: false,
      roles: [],
      permissions: [],
      preferences: {} as UserPreferences,
      shipping_addresses: [],
      billing_addresses: [],
      consents: [],
      metadata: { metadata: '' },
      birthday_date: null,
      phone: null,
      phone_country: null,
      phone_number: null,
      created_at: '2021-01-01T00:00:00.000Z',
    },
    token: 'dummyToken',
    identity_token: 'dummyIdentityToken',
    refresh_token: 'dummyRefreshToken',
  },
}

const dummyAuthResponse = {
  data: {
    user: { ...dummyAuth.data.user },
    accessToken: dummyAuth.data.token,
    identityToken: dummyAuth.data.identity_token,
    refreshToken: dummyAuth.data.refresh_token,
  },
}
const email = 'a@test.pl'
const password = 'password'
const securityCode = 'code'
const identityToken = 'identity-token'

const dummyAuthRegisterResponse: HeseyaResponse<User> = {
  data: dummyAuth.data.user,
  meta: {
    language: META_LANGUAGE,
  },
}

const dummyUserRegisterDto: UserRegisterDto = {
  name: 'Test user',
  email: 'a@test.pl',
  password: 'password',
  consents: {} as UserConsentDto,
}

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('auth service test', () => {
  it('should make a request to login', async () => {
    const service = createAuthService(axios)
    const expectedUrl = '/login'

    mock.onPost(expectedUrl).reply(200, dummyAuth)

    const result = await service.login(email, password, securityCode)
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyAuthResponse.data)
  })

  it('should make a request to refresh token', async () => {
    const service = createAuthService(axios)
    const expectedUrl = '/auth/refresh'

    mock.onPost(expectedUrl).reply(200, dummyAuth)

    const result = await service.refreshToken(dummyAuth.data.token)
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyAuthResponse.data)
  })

  it('should make a register user', async () => {
    const service = createAuthService(axios)
    const expectedUrl = '/register'

    mock.onPost(expectedUrl).reply(200, dummyAuthRegisterResponse)

    const result = await service.register(dummyUserRegisterDto)
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyAuthRegisterResponse.data)
  })

  it('should make a request to logout user', async () => {
    const service = createAuthService(axios)
    const expectedUrl = '/auth/logout'

    mock.onPost(expectedUrl).reply(200, true)

    const result = await service.logout()
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should make a request to verify reset password token', async () => {
    const service = createAuthService(axios)
    const expectedUrl = `/users/reset-password/token/${email}`

    mock.onGet(expectedUrl).reply(200, true)

    const result = await service.verifyResetPasswordToken('token', email)
    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should make a request to request password reset', async () => {
    const service = createAuthService(axios)
    const expectedUrl = '/users/reset-password'

    mock.onPost(expectedUrl).reply(200, true)

    const result = await service.requestResetPassword(email, '/redirect')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should make a request to reset password', async () => {
    const service = createAuthService(axios)
    const expectedUrl = '/users/save-reset-password'

    mock.onPut(expectedUrl).reply(200, true)

    const result = await service.resetPassword({ token: 'token', email, password })

    expect(mock.history.put[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should make a request to check identity with identity token', async () => {
    const service = createAuthService(axios)
    const expectedUrl = `/auth/check/${identityToken}`

    mock.onGet(expectedUrl).reply(200, dummyAuthRegisterResponse)
    const result = await service.checkIdentity(identityToken)

    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyAuthRegisterResponse.data)
  })

  it('should make a request to check identity without identity token', async () => {
    const service = createAuthService(axios)
    const expectedUrl = `/auth/check`

    mock.onGet(expectedUrl).reply(200, dummyAuthRegisterResponse)
    const result = await service.checkIdentity()

    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyAuthRegisterResponse.data)
  })
})
