import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'
import type { Order } from '../../interface'

export default function OrderTable({ orders }: { orders: Order[] }) {
  const navigate = useNavigate()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">주문번호</TableHead>
          <TableHead>회원</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>총 금액</TableHead>
          <TableHead>주문일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.orderId} className="hover:bg-muted cursor-pointer" onClick={() => navigate(`/orders/${order.orderId}`)}>
            <TableCell className="font-mono text-sm text-blue-600 underline">{order.orderNumber}</TableCell>
            <TableCell>{order.nickname}</TableCell>
            <TableCell>
              <Badge>{order.status}</Badge>
            </TableCell>
            <TableCell className="text-right font-semibold text-green-700">{order.totalPrice.toLocaleString()}원</TableCell>
            <TableCell>{format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
