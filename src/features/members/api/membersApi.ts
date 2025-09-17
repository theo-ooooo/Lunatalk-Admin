import { instance } from '@/lib/api'
import type { Member, MemberOrdersPageResponse, MembersPageResponse } from '../interface'

const size = 10

export async function getMembers(page: number): Promise<MembersPageResponse> {
  const { data } = await instance.get(`/members?page=${page}&size=${size}`)
  return data.data
}

export async function getMemberDetail(memberId: number): Promise<Member> {
  const { data } = await instance.get(`/members/${memberId}`)
  return data.data
}

export async function getMemberOrders(memberId: number, page: number): Promise<MemberOrdersPageResponse> {
  const { data } = await instance.get(`/members/${memberId}/orders?page=${page}&size=${size}`)
  return data.data
}
