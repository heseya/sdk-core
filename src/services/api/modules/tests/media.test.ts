import axios from 'axios'
import { createReadStream } from 'fs'
import MockAdapter from 'axios-mock-adapter'

import { CdnMediaType } from '../../../../interfaces'
import { createMediaService } from '../media'

const dummyMedia = {
  id: 'id',
  type: CdnMediaType.Photo,
  url: 'url',
  alt: null,
  slug: null,
}

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('media test service', () => {
  it('should create media', async () => {
    const service = createMediaService(axios)
    const expectedUrl = `/media`

    mock.onPost(expectedUrl).reply(200, { data: dummyMedia })

    const result = await service.create({
      file: createReadStream(__dirname + '/test/mock/dummy.jpg') as any,
    })
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyMedia)
  })
})
