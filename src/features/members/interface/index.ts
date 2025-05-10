export interface Member {
  memberId: number
  username: string
  nickname: string
  phone: string
  email: string
  createdAt: string
}

export interface MemberResponse {
  content: Member[]
  totalPages: number
  totalElements: number
  number: number
  size: number
}
