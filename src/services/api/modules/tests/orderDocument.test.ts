import axios from 'axios'
import { createReadStream } from 'fs'
import MockAdapter from 'axios-mock-adapter'
import { CdnMediaAttachmentType } from '../../../../interfaces'

import { createOrderDocumentsService } from '../ordersDocuments'

const dummyOrderDocument = {
  id: 'id',
  type: CdnMediaAttachmentType.Other,
  name: null,
}

const dummyOrderDocumentFile = {
  size: 1,
  type: 'type',
}
const orderId = '1'
const documentId = '1'

let mock: MockAdapter

beforeAll(() => {
  mock = new MockAdapter(axios)
})

afterEach(() => {
  mock.reset()
})

describe('order documents test service', () => {
  it('should create document', async () => {
    const service = createOrderDocumentsService(axios)
    const expectedUrl = `/orders/id:${orderId}/docs`

    mock.onPost(expectedUrl).reply(200, { data: dummyOrderDocument })

    const result = await service.create(orderId, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      file: createReadStream(__dirname + '/test/mock/dummy.jpg') as any,
      type: CdnMediaAttachmentType.Other,
    })
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyOrderDocument)
  })

  it('should return document', async () => {
    const service = createOrderDocumentsService(axios)
    const expectedUrl = `/orders/id:${orderId}/docs/id:${documentId}/download`

    mock.onGet(expectedUrl).reply(200, dummyOrderDocumentFile)

    const result = await service.download(orderId, documentId)
    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyOrderDocumentFile)
  })

  it('should delete document', async () => {
    const service = createOrderDocumentsService(axios)
    const expectedUrl = `/orders/id:${orderId}/docs/id:${documentId}`

    mock.onDelete(expectedUrl).reply(200, true)

    const result = await service.delete(orderId, documentId)
    expect(mock.history.delete[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })

  it('should send document', async () => {
    const service = createOrderDocumentsService(axios)
    const expectedUrl = `/orders/id:${orderId}/docs/send`

    mock.onPost(expectedUrl).reply(200, true)

    const result = await service.send(orderId, ['1', '2'])
    expect(mock.history.post[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(true)
  })
})
