import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { makeDummyHeseyaResponse } from '../../../../../../test/helpers/utils'

import { createTwoFactorAuthService } from '../twoFactorAuth'

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('two factor auth service test', () => {
  it('should make a request to setup 2fa by app', async () => {
    const service = createTwoFactorAuthService(axios)
    const expectedUrl = '/auth/2fa/setup'

    const dummyResponse = makeDummyHeseyaResponse({
      type: 'app',
      secret: 'secret',
      qr_code_url: 'qrCodeUrl',
    })

    mock.onPost(expectedUrl).reply(200, dummyResponse)

    const result = await service.setup('app')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual({ secret: 'secret', qrCodeUrl: 'qrCodeUrl' })
  })

  it('should make a request to setup 2fa by email', async () => {
    const service = createTwoFactorAuthService(axios)
    const expectedUrl = '/auth/2fa/setup'

    const dummyResponse = makeDummyHeseyaResponse({
      type: 'email',
    })

    mock.onPost(expectedUrl).reply(200, dummyResponse)

    const result = await service.setup('email')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should make a request to confirm 2fa', async () => {
    const service = createTwoFactorAuthService(axios)
    const expectedUrl = '/auth/2fa/confirm'

    const dummyResponse = makeDummyHeseyaResponse({
      recovery_codes: ['code1', 'code2'],
    })

    mock.onPost(expectedUrl).reply(200, dummyResponse)

    const result = await service.confirm('securityCode')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual({ recoveryCodes: dummyResponse.data.recovery_codes })
  })

  it('should make a request to generate recovery codes', async () => {
    const service = createTwoFactorAuthService(axios)
    const expectedUrl = '/auth/2fa/recovery/create'

    const dummyResponse = makeDummyHeseyaResponse({
      recovery_codes: ['code1', 'code2'],
    })

    mock.onPost(expectedUrl).reply(200, dummyResponse)

    const result = await service.generateRecoveryCodes('password')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual({ recoveryCodes: dummyResponse.data.recovery_codes })
  })

  it('should make a request to remove 2fa', async () => {
    const service = createTwoFactorAuthService(axios)
    const expectedUrl = '/auth/2fa/remove'

    mock.onPost(expectedUrl).reply(200)

    const result = await service.remove('password')

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
