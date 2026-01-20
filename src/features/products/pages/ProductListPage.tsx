import { useState } from 'react'
import { useProductsQuery } from '../hooks/query/useProductsQuery'
import ProductListTable from '../components/ProductListTable'
import Pagination from '@/components/shared/Pagination'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export default function ProductListPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)

  const { data } = useProductsQuery(page)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">상품 목록</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">등록된 모든 상품을 조회하고 관리할 수 있습니다.</p>
        </div>
        <Button onClick={() => navigate('/products/new')} size="lg" className="w-full sm:w-auto">
          + 상품 등록
        </Button>
      </div>
      <ProductListTable products={data?.content ?? []} />
      <Pagination currentPage={page} totalPages={data?.totalPages ?? 1} onPageChange={setPage} />
    </div>
  )
}
