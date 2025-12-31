import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router'
import dayjs from 'dayjs'
import type { Inquiry } from '../interface'
import InquiryReplyForm from './InquiryReplyForm'
import InquiryReplyDeleteButton from './InquiryReplyDeleteButton'

interface Props {
  inquiry: Inquiry
}

export default function InquiryDetailSection({ inquiry }: Props) {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'PRODUCT':
        return '상품 문의'
      case 'ORDER':
        return '주문 문의'
      case 'GENERAL':
        return '일반 문의'
      default:
        return type
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '대기중'
      case 'ANSWERED':
        return '답변완료'
      case 'CLOSED':
        return '종료'
      default:
        return status
    }
  }

  const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'ANSWERED':
        return 'default'
      case 'PENDING':
        return 'secondary'
      case 'CLOSED':
        return 'outline'
      default:
        return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      {/* 문의 정보 */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">문의 정보</h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs font-medium">
                {getTypeLabel(inquiry.type)}
              </Badge>
              <Badge variant={getStatusVariant(inquiry.status)} className="text-xs font-medium">
                {getStatusLabel(inquiry.status)}
              </Badge>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">제목</label>
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{inquiry.title}</p>
          </div>
          <div className="border-t pt-6">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">내용</label>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{inquiry.content}</p>
            </div>
          </div>
          {inquiry.referenceName && (
            <div className="border-t pt-6">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">참조 정보</label>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">{inquiry.referenceName}</span>
                {inquiry.referenceId && (
                  <Link
                    to={`/products/${inquiry.referenceId}`}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline"
                  >
                    상품 상세보기 →
                  </Link>
                )}
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">작성자</label>
              <Link
                to={`/members/${inquiry.member.memberId}`}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline"
              >
                {inquiry.member.nickname || inquiry.member.username}
              </Link>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">작성일시</label>
              <p className="text-sm text-gray-700 dark:text-gray-300">{dayjs(inquiry.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 기존 답변 */}
      {inquiry.reply && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800/50 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-green-200 dark:border-green-800/50 bg-green-100/50 dark:bg-green-900/20">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                관리자 답변
              </h3>
              <InquiryReplyDeleteButton inquiryId={inquiry.inquiryId} />
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">답변 내용</label>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-5 border border-green-200 dark:border-green-800/30">
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{inquiry.reply.content}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 border-t border-green-200 dark:border-green-800/50 pt-6">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">답변자</label>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{inquiry.reply.admin.nickname || inquiry.reply.admin.username}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">답변일시</label>
                <p className="text-sm text-gray-700 dark:text-gray-300">{dayjs(inquiry.reply.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
              </div>
            </div>
            {inquiry.reply.updatedAt !== inquiry.reply.createdAt && (
              <div className="border-t border-green-200 dark:border-green-800/50 pt-6">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">최종 수정일시</label>
                <p className="text-sm text-gray-700 dark:text-gray-300">{dayjs(inquiry.reply.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 답변 작성/수정 폼 */}
      <InquiryReplyForm inquiryId={inquiry.inquiryId} existingReply={inquiry.reply} />
    </div>
  )
}
