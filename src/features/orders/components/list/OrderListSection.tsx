import { useOrderList } from '../../\bhooks/useOrderList'
import type { OrderFilterParams } from '../../interface'
import OrderPagination from './OrderPagination'
import OrderTable from './OrderTable'

export default function OrderListContent({ page, filters, setPage }: { page: number; filters: OrderFilterParams; setPage: (p: number) => void }) {
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
