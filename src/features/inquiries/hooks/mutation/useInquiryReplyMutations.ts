import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createInquiryReply, updateInquiryReply, deleteInquiryReply } from '../../api/inquiryApi'
import { inquiriesKey } from '@/lib/constants/queryKeys/inquiries'
import type { InquiryReplyCreateRequest, InquiryReplyUpdateRequest } from '../../interface'
import { toast } from 'sonner'

export function useInquiryReplyMutations(inquiryId: number) {
  const queryClient = useQueryClient()

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: inquiriesKey.detail(inquiryId) })
    queryClient.invalidateQueries({ queryKey: inquiriesKey.all() })
  }

  const createMutation = useMutation({
    mutationFn: (request: InquiryReplyCreateRequest) => createInquiryReply(inquiryId, request),
    onSuccess: () => {
      invalidateQueries()
      toast.success('답변이 등록되었습니다.')
    },
    onError: () => {
      toast.error('답변 등록에 실패했습니다.')
    },
  })

  const updateMutation = useMutation({
    mutationFn: (request: InquiryReplyUpdateRequest) => updateInquiryReply(inquiryId, request),
    onSuccess: () => {
      invalidateQueries()
      toast.success('답변이 수정되었습니다.')
    },
    onError: () => {
      toast.error('답변 수정에 실패했습니다.')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteInquiryReply(inquiryId),
    onSuccess: () => {
      invalidateQueries()
      toast.success('답변이 삭제되었습니다.')
    },
    onError: () => {
      toast.error('답변 삭제에 실패했습니다.')
    },
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
