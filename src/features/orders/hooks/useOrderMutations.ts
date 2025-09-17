import { ordersKey } from '@/lib/constants/queryKeys/orders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateDeliveryParams, UpdateOrderParams } from '../interface'
import { updateDelivery, updateOrder } from '../api/orderApi'

export const useOrderMutations = (orderNumber: string) => {
  const queryClient = useQueryClient()
  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ordersKey.detail(orderNumber) })
  }

  const orderMutaion = useMutation({
    mutationFn: async (data: { orderNumber: string } & UpdateOrderParams) => await updateOrder(data),
    onSuccess: invalidateQueries,
  })

  const deliveryMutaion = useMutation({
    mutationFn: async (data: { deliveryId: number } & UpdateDeliveryParams) => await updateDelivery(data),
    onSuccess: invalidateQueries,
  })

  return {
    orderMutaion,
    deliveryMutaion,
  }
}
