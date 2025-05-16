import type { VISIBILITY } from '@/interface/common'

export interface Category {
  categoryId: number
  categoryName: string
  status: string
  visibility: VISIBILITY
  productCount?: number
}
