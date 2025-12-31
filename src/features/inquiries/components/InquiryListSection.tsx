import { useInquiriesQuery } from '../hooks/query/useInquiriesQuery'
import InquiryTable from './InquiryTable'
import Pagination from '@/components/shared/Pagination'
import type { InquiryListParams } from '../interface'

interface Props {
  page: number
  filters: InquiryListParams
  setPage: (page: number) => void
}

export default function InquiryListContent({ page, filters, setPage }: Props) {
  const { data, isLoading } = useInquiriesQuery({
    ...filters,
    page,
  })

  if (isLoading) {
    return <p className="text-center text-muted-foreground py-20">로딩 중...</p>
  }

  return (
    <div className="space-y-4">
      <InquiryTable inquiries={data?.content ?? []} />
      <Pagination currentPage={page} totalPages={data?.totalPages ?? 1} onPageChange={setPage} />
    </div>
  )
}
