import {
  ProductAttachment,
  ProductAttachmentCreateDto,
  ProductAttachmentUpdateDto,
} from '../../../../interfaces/ProductAttachment'
import {
  CreateNestedEntityRequest,
  DeleteNestedEntityRequest,
  UpdateNestedEntityRequest,
} from '../../types/Requests'
import { ServiceFactory } from '../../types/Service'
import {
  createDeleteNestedRequest,
  createPatchNestedRequest,
  createPostNestedRequest,
} from '../../utils/requests'

export interface ProductAttachmentsService {
  /**
   * Add attachment to product
   */
  create: CreateNestedEntityRequest<ProductAttachment, ProductAttachmentCreateDto>
  /**
   * Update product attachment
   */
  update: UpdateNestedEntityRequest<ProductAttachment, ProductAttachmentUpdateDto>
  /**
   * Removes product attachment
   */
  delete: DeleteNestedEntityRequest
}

export const createProductAttachmentsService: ServiceFactory<ProductAttachmentsService> = (
  axios,
) => {
  const parentRoute = '/products'
  const route = '/attachments'
  return {
    create: createPostNestedRequest(axios, parentRoute, route),
    update: createPatchNestedRequest(axios, parentRoute, route),
    delete: createDeleteNestedRequest(axios, parentRoute, route),
  }
}
