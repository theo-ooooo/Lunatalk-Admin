import { instance } from '@/lib/api'
import type { Inquiry, InquiryListPageResponse, InquiryListParams, InquiryReplyCreateRequest, InquiryReplyUpdateRequest } from '../interface'

export async function getInquiries(params: InquiryListParams): Promise<InquiryListPageResponse> {
  const queryParams = new URLSearchParams()
  if (params.type) queryParams.append('type', params.type)
  if (params.status) queryParams.append('status', params.status)
  if (params.memberUsername) queryParams.append('memberUsername', params.memberUsername)
  queryParams.append('pageable.page', String(params.page))
  queryParams.append('pageable.size', String(params.size || 10))

  const { data } = await instance.get(`/inquiries/admin?${queryParams.toString()}`)
  return data.data
}

export async function getInquiryDetail(inquiryId: number): Promise<Inquiry> {
  const { data } = await instance.get(`/inquiries/${inquiryId}`)
  return data.data
}

export async function createInquiryReply(inquiryId: number, request: InquiryReplyCreateRequest): Promise<Inquiry> {
  const { data } = await instance.post(`/inquiries/${inquiryId}/reply`, request)
  return data.data
}

export async function updateInquiryReply(inquiryId: number, request: InquiryReplyUpdateRequest): Promise<Inquiry> {
  const { data } = await instance.put(`/inquiries/${inquiryId}/reply`, request)
  return data.data
}

export async function deleteInquiryReply(inquiryId: number): Promise<void> {
  await instance.delete(`/inquiries/${inquiryId}/reply`)
}
