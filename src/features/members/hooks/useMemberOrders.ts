import membersKey from '@/lib/constants/queryKeys/members'
import { useQuery } from '@tanstack/react-query'
import { getMemberDetail, getMemberOrders } from '../api/membersApi'

export const useMemberOrders = (memberId: number, page: number) => {
  return useQuery({
    queryKey: membersKey.ordersPagenation(memberId, page),
    queryFn: () => getMemberOrders(memberId, page),
  })
}
