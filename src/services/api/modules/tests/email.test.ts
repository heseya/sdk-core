import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { createEmailsService } from '../email'

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('emails service test', () => {
  it('should send an email', async () => {
    const service = createEmailsService(axios)
    const expectedUrl = '/email'

    mock.onPost(expectedUrl).reply(201)

    const result = await service.send({
      title: 'Hello email',
      receiver: 'receiver@example.com',
      body: '<h1>Hello world</h1>',
    })

    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
