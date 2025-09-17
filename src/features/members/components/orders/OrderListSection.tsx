import { useState } from 'react'
import { useParams } from 'react-router'
import MemberOrderTable from './MemberOrderTable'
import OrderPagination from './OrderPagination'
import { useMemberOrders } from '../../hooks/useMemberOrders'

export default function OrderListSection() {
  const { id } = useParams()
  const [page, setPage] = useState(0)

  const { data, isLoading, error } = useMemberOrders(Number(id), page)

  if (isLoading) return <p className="text-center text-sm py-12">주문 불러오는 중...</p>
  if (error || !data) return <p className="text-destructive py-12 text-center">불러오기 실패</p>

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-3">주문 내역</h2>
      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <MemberOrderTable orders={data.content} />
        <OrderPagination currentPage={data.number} totalPages={data.totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}
