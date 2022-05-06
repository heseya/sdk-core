import { HeseyaResponse } from '../../../interfaces/Response'
import { ServiceFactory } from '../types/Service'

import { UUID } from '../../../interfaces/UUID'
import { OrderDocument, OrderDocumentCreateDto } from '../../../interfaces/OrderDocuments'

export interface OrderDocumentsService {
  /**
   * Uploads new document to the order.
   */
  create(orderId: UUID, documentDto: OrderDocumentCreateDto): Promise<OrderDocument>

  /**
   * Returns blob of the given order document.
   */
  download(orderId: UUID, documentId: UUID): Promise<Blob>

  /**
   * Removes document from the order
   */
  delete(orderId: UUID, documentId: UUID): Promise<true>

  /**
   * Sends given documents to the client
   */
  send(orderId: UUID, documentIds: UUID[]): Promise<true>
}

export const createOrderDocumentsService: ServiceFactory<OrderDocumentsService> = (axios) => ({
  async create(orderId, documentDto) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    FormData = !process.env.NODE_ENV ? FormData : await import('form-data')

    const form = new FormData()
    form.append('type', documentDto.type)
    if (documentDto.name) form.append('name', documentDto.name)
    form.append('file', documentDto.file)

    const response = await axios.post<HeseyaResponse<OrderDocument>>(
      `/orders/id:${orderId}/docs`,
      form,
    )

    return response.data.data
  },

  async download(orderId, documentId) {
    const response = await axios.get<Blob>(`/orders/id:${orderId}/docs/id:${documentId}/download`, {
      responseType: 'blob',
    })
    return response.data
  },

  async delete(orderId, documentId) {
    await axios.delete(`/orders/id:${orderId}/docs/id:${documentId}`)
    return true
  },

  async send(orderId, documentIds) {
    await axios.post(`/orders/id:${orderId}/docs/send`, { uuid: documentIds })
    return true
  },
})
