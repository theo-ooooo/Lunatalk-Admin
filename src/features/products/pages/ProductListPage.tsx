import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductListTable from '../components/ProductListTable'
import Pagination from '@/components/shared/Pagination'

export default function ProductListPage() {
  const [page, setPage] = useState(0)

  const { data } = useProducts(page)

  console.log(data)

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">상품 목록</h2>
        <p className="text-sm text-muted-foreground">등록된 모든 상품을 조회하고 관리할 수 있습니다.</p>
      </div>
      <ProductListTable products={data?.content ?? []} />

      <Pagination currentPage={page} totalPages={data?.totalPages ?? 1} onPageChange={setPage} />
    </div>
  )
}
