import type { PageResponse } from '@/interface/common'

export interface ProductsSearchParams {
  productName?: string
}

export interface Product {
  productId: number
  price: number
  name: string
  images: {
    imageType: string
    imageUrl: string
  }[]
  colors: string[]
}

export interface ProductListPageResponse extends PageResponse<Product[]> {}

export interface ProductCreateRequest {
  name: string
  price: number
  quantity: number
  visibility: 'VISIBLE' | 'HIDDEN'
  colors: string[]
}
