import membersKey from '@/lib/constants/queryKeys/members'
import { useQuery } from '@tanstack/react-query'
import { getMemberDetail } from '../api/membersApi'

export const useMemberDetail = (memberId: number) => {
  return useQuery({
    queryKey: membersKey.detail(memberId),
    queryFn: () => getMemberDetail(memberId),
  })
}
