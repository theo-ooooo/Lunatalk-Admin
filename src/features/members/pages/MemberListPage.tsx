import { useState } from 'react'
import { useMemberList } from '../hooks/useMemberList'
import MemberTable from '../components/members/MemberTable'
import MemberPagination from '../components/members/MemberPagination'
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">회원 목록</h1>
        <p className="text-muted-foreground text-sm mt-1">가입된 회원을 확인하고 관리할 수 있습니다.</p>
      </div>

      {/* 회원 테이블 */}
      <div className="rounded-2xl border bg-white shadow-sm">
        <MemberTable members={data.content} />
      </div>

      {/* 페이지네이션 */}
      <div className="mt-6">
        <Pagination currentPage={data.number} totalPages={data.totalPages} onPageChange={(p) => setPage(p)} />
      </div>
    </div>
  )
}
