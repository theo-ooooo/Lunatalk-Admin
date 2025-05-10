import { useQuery } from '@tanstack/react-query'
import { getMembers } from '../api/membersApi'

export const useMemberList = (page: number) => {
  return useQuery({
    queryKey: ['members', page],
    queryFn: () => getMembers(page),
  })
}
