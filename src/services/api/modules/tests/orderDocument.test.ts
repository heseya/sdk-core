import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { createOrderDocumentsService } from '../ordersDocuments'

const dummyOrderDocumentResponse = {
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
  it('should return document', async () => {
    const service = createOrderDocumentsService(axios)
    const expectedUrl = `/orders/id:${orderId}/docs/id:${documentId}/download`

    mock.onGet(expectedUrl).reply(200, dummyOrderDocumentResponse)

    const result = await service.download(orderId, documentId)
    expect(mock.history.get[0]?.url).toEqual(expectedUrl)
    expect(result).toEqual(dummyOrderDocumentResponse)
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
