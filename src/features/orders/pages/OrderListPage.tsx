import { useState, Suspense } from 'react'
import type { OrderFilterParams } from '../interface'
import { useOrderList } from '../\bhooks/useOrderList'
import OrderFilterForm from '../components/list/OrderFilterForm'
import OrderPagination from '../components/list/OrderPagination'
import OrderTable from '../components/list/OrderTable'

function OrderListContent({ page, filters, setPage }: { page: number; filters: OrderFilterParams; setPage: (p: number) => void }) {
  const { data } = useOrderList({ page, ...filters })

  if (!data || data.content.length === 0) {
    return <p className="text-center text-muted-foreground py-20">주문 내역이 없습니다~</p>
  }

  return (
    <>
      <div className="rounded-2xl border bg-white shadow-sm">
        <OrderTable orders={data.content} />
      </div>
      <OrderPagination currentPage={data.number} totalPages={data.totalPages} onPageChange={setPage} />
    </>
  )
}

export default function OrderListPage() {
  const [page, setPage] = useState(0)
  const [filters, setFilters] = useState<OrderFilterParams>({})

  const handleSearch = (filters: OrderFilterParams) => {
    setPage(0)
    setFilters(filters)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-1">전체 주문 관리</h1>
      <p className="text-muted-foreground text-sm mb-6">관리자가 전체 주문을 검색, 확인하고 상세 페이지로 접근할 수 있습니다.</p>

      <OrderFilterForm onSearch={handleSearch} />

      <Suspense fallback={<p className="text-center text-muted-foreground py-20">로딩 중...</p>}>
        <OrderListContent page={page} filters={filters} setPage={setPage} />
      </Suspense>
    </div>
  )
}
