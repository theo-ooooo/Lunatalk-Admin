import { useNavigate } from 'react-router'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs'
import type { Inquiry } from '../interface'

interface Props {
  inquiries: Inquiry[]
}

export default function InquiryTable({ inquiries }: Props) {
  const navigate = useNavigate()

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

  if (inquiries.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm p-16">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">문의가 없습니다</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">검색 조건을 변경해보세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800/50">
              <TableHead className="min-w-[60px] sm:w-[70px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">ID</TableHead>
              <TableHead className="min-w-[150px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">제목</TableHead>
              <TableHead className="min-w-[90px] sm:w-[110px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">타입</TableHead>
              <TableHead className="min-w-[80px] sm:w-[100px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">상태</TableHead>
              <TableHead className="min-w-[100px] sm:w-[120px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">작성자</TableHead>
              <TableHead className="min-w-[140px] sm:w-[160px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">작성일시</TableHead>
              <TableHead className="min-w-[70px] sm:w-[90px] font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm">답변</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow
                key={inquiry.inquiryId}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b"
                onClick={() => navigate(`/inquiries/${inquiry.inquiryId}`)}
              >
                <TableCell className="font-mono text-xs text-gray-500 dark:text-gray-400">#{inquiry.inquiryId}</TableCell>
                <TableCell className="text-xs sm:text-sm">
                  <div className="font-medium text-gray-900 dark:text-gray-100">{inquiry.title}</div>
                </TableCell>
                <TableCell className="text-xs sm:text-sm">
                  <Badge variant="outline" className="text-xs font-normal">
                    {getTypeLabel(inquiry.type)}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs sm:text-sm">
                  <Badge variant={getStatusVariant(inquiry.status)} className="text-xs font-normal">
                    {getStatusLabel(inquiry.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{inquiry.member.nickname || inquiry.member.username}</TableCell>
                <TableCell className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{dayjs(inquiry.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                <TableCell className="text-center">
                  {inquiry.reply ? (
                    <span className="inline-flex items-center justify-center w-16 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      완료
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-16 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      대기
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
