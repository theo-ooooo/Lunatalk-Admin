import type { PageResponse } from '@/interface/common'

export interface ProductsSearchParams {
  productName?: string
}

export interface Product {
  productId: number
  price: number
  name: string
  quantity: number
  visibility: 'VISIBLE' | 'HIDDEN'
  images: ProductImage[]
  colors: string[]
}

export interface ProductListPageResponse extends PageResponse<Product[]> {}

export interface ProductCreateAndUpdateRequest {
  name: string
  price: number
  quantity: number
  visibility: 'VISIBLE' | 'HIDDEN'
  colors: string[]
}

export interface FormValues {
  name: string
  price: number
  quantity: number
  visibility: 'VISIBLE' | 'HIDDEN'
  colors: { value: string }[]
}

export interface ProductPresignedUrlResponse {
  presignedUrl: string
  imageKey: string
}

export interface ProductImage {
  imageKey: string
  imageUrl: string
  imageType: string
}
