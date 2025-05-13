import { instance } from '@/lib/api'
import type { ProductListPageResponse, ProductsSearchParams } from '../interface'

export default async function getProducts({ page, productName }: { page: number } & ProductsSearchParams): Promise<ProductListPageResponse> {
  const { data } = await instance.get('/products', { params: { page, size: 10, productName } })
  return data.data
}
