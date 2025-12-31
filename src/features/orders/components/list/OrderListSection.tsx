import Pagination from '@/components/shared/Pagination'
import { useOrderList } from '../../hooks/useOrderList'
import type { OrderFilterParams } from '../../interface'
import OrderTable from './OrderTable'

export default function OrderListContent({ page, filters, setPage }: { page: number; filters: OrderFilterParams; setPage: (p: number) => void }) {
  const { data } = useOrderList({ page, ...filters })

  if (!data || data.content.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm p-16">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">주문 내역이 없습니다</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">검색 조건을 변경해보세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <OrderTable orders={data.content} />
      <Pagination currentPage={data.number} totalPages={data.totalPages} onPageChange={setPage} />
    </div>
  )
}
