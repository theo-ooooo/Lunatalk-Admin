import { useState } from 'react'
import { useMemberList } from '../hooks/useMemberList'
import MemberTable from '../components/members/MemberTable'
import Pagination from '@/components/shared/Pagination'

export default function MemberListPage() {
  const [page, setPage] = useState(0)
  const { data, isLoading, error } = useMemberList(page)

  if (isLoading) {
    return <p className="text-center py-20 text-sm text-muted-foreground">로딩 중...</p>
  }

  if (error || !data) {
    return <p className="text-center text-destructive py-20">회원 불러오기 실패</p>
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">회원 목록</h2>
        <p className="text-sm text-muted-foreground">가입된 회원을 확인하고 관리할 수 있습니다.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm overflow-hidden">
        <MemberTable members={data.content} />
      </div>

      <Pagination currentPage={data.number} totalPages={data.totalPages} onPageChange={(p) => setPage(p)} />
    </div>
  )
}
