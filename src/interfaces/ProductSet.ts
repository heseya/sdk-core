export interface ProductSet {
  id: string | number
  name: string
  slug: string
  public: boolean
  visible: boolean
  hide_on_index: boolean
  parent?: ProductSet | null
  parent_id?: string | null
  children?: ProductSet[]
  children_ids?: string[]
}
