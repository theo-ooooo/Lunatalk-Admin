import type { Member } from '@/features/members/interface'
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
  orderId?: number
  productName: string
  price: number
  quantity: number
  totalPrice: number
  color: string
}

export interface Delivery {
  deliveryId: number
  receiverName: string
  receiverPhone: string
  addressLine1: string
  addressLine2: string
  zipcode: string
  message: string | null
  courierCompany: string | null
  trackingNumber: string | null
  status: string
}

export interface OrderFilterParams {
  orderNumber?: string
  status?: string
  nickname?: string
  email?: string
  phone?: string
  username?: string
}

export interface UpdateOrderParams {
  status: string
}

export interface UpdateDeliveryParams {
  courierCompany: string | null
  trackingNumber: string | null
  status: string
}

export interface OrderDetail extends Order {
  deliveries: Delivery[]
  member: Member
}

export interface OrderListPageResponse extends PageResponse<Order[]> {}
