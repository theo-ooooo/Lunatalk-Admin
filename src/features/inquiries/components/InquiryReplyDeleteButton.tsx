import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useInquiryReplyMutations } from '../hooks/mutation/useInquiryReplyMutations'

interface Props {
  inquiryId: number
}

export default function InquiryReplyDeleteButton({ inquiryId }: Props) {
  const [open, setOpen] = useState(false)
  const { deleteMutation } = useInquiryReplyMutations(inquiryId)

  const handleConfirm = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)} disabled={deleteMutation.isPending}>
        답변 삭제
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>답변 삭제</DialogTitle>
          </DialogHeader>
          <p className="py-4 text-sm">답변을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={deleteMutation.isPending}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
