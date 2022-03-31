import { CrudService, ServiceFactory } from '../types/Service'

import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'
import { GetEntityRequest } from '../types/Requests'
import { WebhookEntry, WebhookEntryDto, WebhookEventEntry } from '../../../interfaces/Webhook'
import { PaginationParams } from '../types/DefaultParams'

interface WebhooksListParams extends PaginationParams {
  name?: string
  url?: string
}

export interface WebhooksService
  extends Omit<
    CrudService<WebhookEntry, WebhookEntry, WebhookEntryDto, WebhookEntryDto, WebhooksListParams>,
    'getOneBySlug'
  > {
  /**
   * Get all available webhooks events
   */
  getEvents: GetEntityRequest<WebhookEventEntry>
}

export const createWebhooksService: ServiceFactory<WebhooksService> = (axios) => {
  const route = 'webhooks'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route),
    getEvents: createGetListRequest(axios, `${route}/events`),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
