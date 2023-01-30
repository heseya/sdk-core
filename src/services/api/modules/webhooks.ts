import { CrudService, ServiceFactory } from '../types/Service'

import {
  createDeleteRequest,
  createGetListRequest,
  createGetOneRequest,
  createPatchRequest,
  createPostRequest,
} from '../utils/requests'
import { GetEntityRequest } from '../types/Requests'
import {
  WebhookEntry,
  WebhookEntryCreateDto,
  WebhookEntryUpdateDto,
  WebhookEventEntry,
  WebhookEventLog,
} from '../../../interfaces/Webhook'
import { PaginationParams } from '../types/DefaultParams'

interface WebhooksListParams extends PaginationParams {
  name?: string
  url?: string
}

export interface WebhooksService
  extends Omit<
    CrudService<
      WebhookEntry,
      WebhookEntry,
      WebhookEntryCreateDto,
      WebhookEntryUpdateDto,
      WebhooksListParams
    >,
    'getOneBySlug'
  > {
  /**
   * Get all available webhooks events
   */
  getEvents: GetEntityRequest<WebhookEventEntry>

  /**
   * Get all logs of failed webhooks
   */
  getLogs: GetEntityRequest<WebhookEventLog>
}

export const createWebhooksService: ServiceFactory<WebhooksService> = (axios) => {
  const route = 'webhooks'
  return {
    get: createGetListRequest(axios, route),
    getOne: createGetOneRequest(axios, route, { byId: true }),
    getEvents: createGetListRequest(axios, `${route}/events`),
    getLogs: createGetListRequest(axios, `${route}/logs`),
    create: createPostRequest(axios, route),
    update: createPatchRequest(axios, route),
    delete: createDeleteRequest(axios, route),
  }
}
