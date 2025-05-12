export interface Order {
  orderId: number
  orderNumber: string
  status: string
  totalPrice: number
  orderItems: OrderItem[]
  createdAt: string
}

interface OrderItem {
  orderId: number
  priductName: string
  price: number
  quantity: number
  totalPrice: number
  color: string
}
