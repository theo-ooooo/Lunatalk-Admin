import type { PageResponse } from '@/interface/common'

export interface Order {
  orderId: number
  orderNumber: string
  nickname?: string
  status: string
  totalPrice: number
  createdAt: string
  orderItems: OrderItem[]
}

interface OrderItem {
  orderId: number
  productName: string
  price: number
  quantity: number
  totalPrice: number
  color: string
}

export interface OrderFilterParams {
  orderNumber?: string
  status?: string
  nickname?: string
  email?: string
  phone?: string
  username?: string
}

export interface OrderListPageResponse extends PageResponse<Order[]> {}
