import { instance } from '@/lib/api'
import type { OrderDetail, OrderListPageResponse, UpdateDeliveryParams, UpdateOrderParams } from '../interface'

export async function getOrders(queryString: string): Promise<OrderListPageResponse> {
  const { data } = await instance.get(`/orders?${queryString}`)
  return data.data
}

export async function getOrderByOrderNumber(orderNumber: string): Promise<OrderDetail> {
  const { data } = await instance.get(`/orders/${orderNumber}`)
  return data.data
}

export async function updateOrder({ orderNumber, ...rest }: { orderNumber: string } & UpdateOrderParams) {
  await instance.patch(`/orders/${orderNumber}`, { ...rest })
}

export async function updateDelivery({ deliveryId, ...rest }: { deliveryId: number } & UpdateDeliveryParams) {
  await instance.patch(`deliveries/${deliveryId}`, { ...rest })
}
