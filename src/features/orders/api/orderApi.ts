import { instance } from '@/lib/api'
import type { OrderListPageResponse } from '../interface'

export async function getOrders(queryString: string): Promise<OrderListPageResponse> {
  const { data } = await instance.get(`/orders?${queryString}`)
  return data.data
}
