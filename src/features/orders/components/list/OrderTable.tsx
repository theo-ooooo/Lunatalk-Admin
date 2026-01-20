import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'
import type { Order } from '../../interface'

export default function OrderTable({ orders }: { orders: Order[] }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800/50">
              <TableHead className="w-[180px] font-semibold text-gray-700 dark:text-gray-300">주문번호</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300">회원</TableHead>
              <TableHead className="w-[120px] font-semibold text-gray-700 dark:text-gray-300">상태</TableHead>
              <TableHead className="w-[140px] font-semibold text-gray-700 dark:text-gray-300 text-right">총 금액</TableHead>
              <TableHead className="w-[160px] font-semibold text-gray-700 dark:text-gray-300">주문일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.orderId}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b"
                onClick={() => navigate(`/orders/${order.orderNumber}`)}
              >
                <TableCell className="font-mono text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">{order.username}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs font-normal">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-green-700 dark:text-green-400">
                  {order.totalPrice.toLocaleString()}원
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                  {format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
