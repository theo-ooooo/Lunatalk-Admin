import { useState, Suspense } from 'react'
import type { InquiryListParams } from '../interface'
import InquiryFilterForm from '../components/InquiryFilterForm'
import InquiryListContent from '../components/InquiryListSection'

export default function InquiryListPage() {
  const [page, setPage] = useState(0)
  const [filters, setFilters] = useState<InquiryListParams>({
    page: 0,
    size: 10,
  })

  const handleSearch = (newFilters: InquiryListParams) => {
    setPage(0)
    setFilters(newFilters)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">문의 관리</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">전체 문의를 검색하고 답변할 수 있습니다.</p>
      </div>

      <InquiryFilterForm onSearch={handleSearch} />

      <Suspense fallback={<div className="text-center text-muted-foreground py-20">로딩 중...</div>}>
        <InquiryListContent page={page} filters={filters} setPage={setPage} />
      </Suspense>
    </div>
  )
}
