import { instance } from '@/lib/api'
import type { MemberResponse } from '../interface'

export async function getMembers(page: number): Promise<MemberResponse> {
  const { data } = await instance.get(`/members?page=${page}&size=10`)
  return data.data
}
