import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import type { Order } from '@/features/orders/interface'

export default function MemberOrderTable({ orders }: { orders: Order[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>주문번호</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>총 금액</TableHead>
          <TableHead>주문일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <>
            <TableRow key={order.orderId}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.totalPrice.toLocaleString()}원</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
            </TableRow>
            {order.orderItems.map((item, idx) => (
              <TableRow key={`${order.orderId}-${idx}`} className="bg-muted">
                <TableCell colSpan={4}>
                  <div className="flex justify-between text-sm px-4 py-2">
                    <div>
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-muted-foreground">색상: {item.color}</div>
                    </div>
                    <div className="text-right">
                      <div>
                        {item.price.toLocaleString()}원 × {item.quantity}개
                      </div>
                      <div className="text-muted-foreground">합계: {item.totalPrice.toLocaleString()}원</div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </>
        ))}
      </TableBody>
    </Table>
  )
}
