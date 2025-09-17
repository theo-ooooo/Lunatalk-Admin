import type { Order } from '@/features/orders/interface'
import type { PageResponse } from '@/interface/common'

export interface Member {
  memberId: number
  username: string
  nickname: string
  phone: string
  email: string
  profileImgUrl: string | null
  createdAt: string
}

export interface MembersPageResponse extends PageResponse<Member[]> {}

export interface MemberOrdersPageResponse extends PageResponse<Order[]> {}
