export type InquiryType = 'PRODUCT' | 'ORDER' | 'GENERAL'
export type InquiryStatus = 'PENDING' | 'ANSWERED' | 'CLOSED'

export interface InquiryReply {
  replyId: number
  content: string
  admin: MemberInfo
  createdAt: string
  updatedAt: string
}

export interface MemberInfo {
  memberId: number
  username: string
  nickname: string
  phone: string
  email: string
  profileImgUrl: string
  createdAt: string
}

export interface Inquiry {
  inquiryId: number
  type: InquiryType
  title: string
  content: string
  status: InquiryStatus
  referenceId: number | null
  referenceName: string | null
  member: MemberInfo
  reply: InquiryReply | null
  createdAt: string
  updatedAt: string
}

export interface InquiryListPageResponse {
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  size: number
  content: Inquiry[]
  number: number
  numberOfElements: number
  empty: boolean
}

export interface InquiryListParams {
  type?: InquiryType
  status?: InquiryStatus
  memberUsername?: string
  page: number
  size?: number
}

export interface InquiryReplyCreateRequest {
  content: string
}

export interface InquiryReplyUpdateRequest {
  content: string
}

