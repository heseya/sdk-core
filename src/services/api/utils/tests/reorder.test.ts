import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createReorderPostRequest } from '../reorder'

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('createReorderPostRequest', () => {
  it('should make a rest request with params', async () => {
    const execute = createReorderPostRequest(axios, 'products', 'payloadkey')
    const expectedUrl = '/products/reorder?param=yes'

    mock.onPost(expectedUrl).reply(200, undefined)

    const result = await execute(['test'], { param: 'yes' })

    expect(mock.history.post[0].data).toEqual('{"payloadkey":["test"]}')
    expect(mock.history.post[0].url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
