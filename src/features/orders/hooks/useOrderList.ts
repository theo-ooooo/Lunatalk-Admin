import { ordersKey } from '@/lib/constants/queryKeys/orders'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../api/orderApi'
import type { OrderFilterParams } from '../interface'

export const useOrderList = (params: { page: number } & OrderFilterParams) => {
  const queryString = new URLSearchParams({
    page: String(params.page),
    ...(params.orderNumber && { orderNumber: params.orderNumber }),
    ...(params.status && { status: params.status }),
    ...(params.username && { username: params.username }),
    ...(params.email && { email: params.email }),
    ...(params.phone && { phone: params.phone }),
  }).toString()

  return useQuery({ queryKey: ordersKey.all(queryString), queryFn: () => getOrders(queryString) })
}
