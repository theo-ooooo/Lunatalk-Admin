import { instance } from '@/lib/api'
import type { Product, ProductCreateAndUpdateRequest, ProductListPageResponse, ProductPresignedUrlResponse, ProductsSearchParams } from '../interface'

export async function getProducts({ page, productName }: { page: number } & ProductsSearchParams): Promise<ProductListPageResponse> {
  const { data } = await instance.get('/products', { params: { page, size: 10, productName } })
  return data.data
}

export async function getProduct({ productId }: { productId: number }): Promise<Product> {
  const { data } = await instance.get(`/products/${productId}`)

  return data.data
}

export async function createProduct({ name, price, quantity, visibility, colors, categoryId }: ProductCreateAndUpdateRequest): Promise<void> {
  await instance.post('/products/create', { name, price, quantity, visibility, colors, categoryId })
}

export async function updatePorduct({ productId, ...rest }: { productId: number } & ProductCreateAndUpdateRequest) {
  await instance.put(`/products/${productId}`, rest)
}

export async function deleteProduct({ productId }: { productId: number }): Promise<void> {
  await instance.delete(`/products/${productId}`)
}

export async function getPresignedUrl({ productId, imageType, imageFileExtension }: { productId: number; imageType: string; imageFileExtension: string }): Promise<ProductPresignedUrlResponse> {
  const { data } = await instance.post('/images/products/upload-url', { productId, imageType, imageFileExtension })
  return data.data
}

export async function uploadToPresignedUrl({ presignedUrl, file }: { presignedUrl: string; file: File }): Promise<void> {
  await fetch(presignedUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file })
}

export async function uploadCompleteImage({ imageKey }: { imageKey: string }): Promise<void> {
  await instance.post('/images/products/upload-complete', { imageKey })
}

export async function deleteImage({ imageKey }: { imageKey: string }): Promise<void> {
  await instance.delete(`/images/delete/${imageKey}`)
}
