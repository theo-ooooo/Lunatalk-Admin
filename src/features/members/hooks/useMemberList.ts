import { useQuery } from '@tanstack/react-query'
import { getMembers } from '../api/membersApi'
import membersKey from '@/lib/constants/queryKeys/members'

export const useMemberList = (page: number) => {
  return useQuery({
    queryKey: membersKey.pagenation(page),
    queryFn: () => getMembers(page),
  })
}
