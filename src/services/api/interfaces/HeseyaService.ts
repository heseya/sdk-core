import { ListProduct, Product } from '../../../interfaces/Product'
import { CrudService } from './CrudService'

export interface HeseyaService {
  Products: CrudService<Product, ListProduct>

  // TODO: more services
  // ProductSets: CrudService<ProductSet>
  // Pages: CrudService<Page>
  // Orders: CrudService<Order>
  // Env: CrudService<Env>
  // Seo: CrudService<SeoMetadata>
}
