import type { Product } from '@/features/products/interface'

export interface Exhibition {
  exhibitionId: number
  title: string
  description: string
  visibility: string
  startAt: Date
  endAt: Date
  products: ExhibitionProduct[]
}

export interface ExhibitionProduct {
  product: Product
  sortOrder: number
}

export interface CreateExhibitionRequest {
  title: string
  description: string
  visibility: string
  startAt: Date
  endAt: Date
  productIds: number[]
}
