import { ordersKey } from '@/lib/constants/queryKeys/orders'
import { useQuery } from '@tanstack/react-query'
import { getOrderByOrderNumber } from '../api/orderApi'

export const useOrderDetail = (orderNumber: string) => {
  return useQuery({
    queryKey: ordersKey.detail(orderNumber),
    queryFn: () => getOrderByOrderNumber(orderNumber),
  })
}
