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
