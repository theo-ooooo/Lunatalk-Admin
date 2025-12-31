import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useInquiryReplyMutations } from '../hooks/mutation/useInquiryReplyMutations'
import type { InquiryReply } from '../interface'

interface Props {
  inquiryId: number
  existingReply?: InquiryReply | null
}

export default function InquiryReplyForm({ inquiryId, existingReply }: Props) {
  const [content, setContent] = useState(existingReply?.content || '')
  const { createMutation, updateMutation } = useInquiryReplyMutations(inquiryId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    if (existingReply) {
      updateMutation.mutate({ content })
    } else {
      createMutation.mutate({ content })
      setContent('')
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg border shadow-sm overflow-hidden ${
      existingReply 
        ? 'border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20' 
        : 'border-orange-200 dark:border-orange-800/50 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20'
    }`}>
      <div className={`px-6 py-4 border-b ${
        existingReply 
          ? 'border-blue-200 dark:border-blue-800/50 bg-blue-100/50 dark:bg-blue-900/20' 
          : 'border-orange-200 dark:border-orange-800/50 bg-orange-100/50 dark:bg-orange-900/20'
      }`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${existingReply ? 'bg-blue-500' : 'bg-orange-500'}`}></span>
          {existingReply ? '답변 수정' : '답변 작성'}
        </h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
              {existingReply ? '수정할 답변 내용' : '답변 내용'}
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="답변 내용을 입력하세요"
              rows={10}
              disabled={isPending}
              required
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              type="submit" 
              disabled={isPending || !content.trim()} 
              size="lg"
              className="min-w-[120px]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  처리 중...
                </span>
              ) : existingReply ? (
                '답변 수정'
              ) : (
                '답변 등록'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
