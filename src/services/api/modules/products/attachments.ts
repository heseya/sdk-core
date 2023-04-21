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
   * Add Product to wishlist
   */
  add: CreateNestedEntityRequest<ProductAttachment, ProductAttachmentCreateDto>
  /**
   * Add Product to wishlist
   */
  update: UpdateNestedEntityRequest<ProductAttachment, ProductAttachmentUpdateDto>
  /**
   * Removes product from wishlist by product_id
   */
  delete: DeleteNestedEntityRequest
}

export const createProductAttachmentsService: ServiceFactory<ProductAttachmentsService> = (
  axios,
) => {
  const parentRoute = '/products'
  const route = '/attachments'
  return {
    add: createPostNestedRequest(axios, parentRoute, route),
    update: createPatchNestedRequest(axios, parentRoute, route),
    delete: createDeleteNestedRequest(axios, parentRoute, route),
  }
}
