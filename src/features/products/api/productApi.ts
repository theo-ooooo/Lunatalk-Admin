import { instance } from '@/lib/api'
import type { ProductCreateRequest, ProductListPageResponse, ProductsSearchParams } from '../interface'

export async function getProducts({ page, productName }: { page: number } & ProductsSearchParams): Promise<ProductListPageResponse> {
  const { data } = await instance.get('/products', { params: { page, size: 10, productName } })
  return data.data
}

export async function createProduct({ name, price, quantity, visibility, colors }: ProductCreateRequest): Promise<void> {
  await instance.post('/products/create', { name, price, quantity, visibility, colors })
}
