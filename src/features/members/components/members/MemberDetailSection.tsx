import { Suspense } from 'react'
import { useParams } from 'react-router'

import { useMemberDetail } from '../../hooks/useMemberDetail'
import FullPageLoader from '@/components/feedback/FullPageLoader'
import MemberProfileCard from './MemberProfileCard'

export default function MemberDetailSection() {
  const { id } = useParams()
  const { data: member, error } = useMemberDetail(Number(id))

  if (error) return <p className="text-destructive py-12 text-center">불러오기 실패</p>

  if (!member) return <p>존재하지 않는 회원입니다.</p>

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">회원 상세</h1>
      <Suspense fallback={<FullPageLoader />}>
        <MemberProfileCard member={member} />
      </Suspense>
    </>
  )
}
