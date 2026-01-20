import { useState, Suspense } from 'react'
import type { OrderFilterParams } from '../interface'
import OrderFilterForm from '../components/list/OrderFilterForm'
import OrderListContent from '../components/list/OrderListSection'
import PaymentStatisticsAggregateButton from '../components/list/PaymentStatisticsAggregateButton'

export default function OrderListPage() {
  const [page, setPage] = useState(0)
  const [filters, setFilters] = useState<OrderFilterParams>({})

  const handleSearch = (filters: OrderFilterParams) => {
    setPage(0)
    setFilters(filters)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">전체 주문 관리</h2>
          <p className="text-sm text-muted-foreground">관리자가 전체 주문을 검색, 확인하고 상세 페이지로 접근할 수 있습니다.</p>
        </div>
        <PaymentStatisticsAggregateButton />
      </div>

      <OrderFilterForm onSearch={handleSearch} />

      <Suspense fallback={<div className="text-center text-muted-foreground py-20">로딩 중...</div>}>
        <OrderListContent page={page} filters={filters} setPage={setPage} />
      </Suspense>
    </div>
  )
}
