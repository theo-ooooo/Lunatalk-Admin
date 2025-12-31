import { useParams, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { useInquiryDetail } from '../hooks/query/useInquiryDetail'
import InquiryDetailSection from '../components/InquiryDetailSection'
import { ArrowLeft } from 'lucide-react'

export default function InquiryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const inquiryId = id ? parseInt(id, 10) : 0
  const { data: inquiry, isLoading } = useInquiryDetail(inquiryId)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center text-muted-foreground py-20">로딩 중...</div>
      </div>
    )
  }

  if (!inquiry) {
    return (
      <div className="space-y-6">
        <div className="text-center text-muted-foreground py-20">
          <p className="text-lg font-medium mb-2">문의를 찾을 수 없습니다</p>
          <Button variant="outline" onClick={() => navigate('/inquiries')}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/inquiries')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">문의 상세</h2>
            <p className="text-sm text-muted-foreground mt-1">문의 #{inquiry.inquiryId}</p>
          </div>
        </div>
      </div>

      <InquiryDetailSection inquiry={inquiry} />
    </div>
  )
}
