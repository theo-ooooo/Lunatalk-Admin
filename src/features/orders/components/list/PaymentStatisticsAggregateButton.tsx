import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { RefreshCw, Calendar, CheckCircle } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { aggregatePaymentStatistics } from '../../api/paymentStatisticsApi'
import { toast } from 'sonner'

export default function PaymentStatisticsAggregateButton() {
  const [date, setDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: (selectedDate: string) => aggregatePaymentStatistics(selectedDate),
    onSuccess: () => {
      setIsSuccessModalOpen(true)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || '결제 통계 갱신에 실패했습니다.')
    },
  })

  const handleAggregate = () => {
    if (!date) {
      toast.error('날짜를 선택해주세요.')
      return
    }
    mutate(date)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-40"
          />
        </div>
        <Button onClick={handleAggregate} disabled={isPending} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? 'animate-spin' : ''}`} />
          결제 통계 갱신
        </Button>
      </div>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <DialogTitle>결제 통계 갱신 완료</DialogTitle>
            </div>
            <DialogDescription className="pt-2">
              {formatDate(date)}의 결제 통계가 성공적으로 갱신되었습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsSuccessModalOpen(false)}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

