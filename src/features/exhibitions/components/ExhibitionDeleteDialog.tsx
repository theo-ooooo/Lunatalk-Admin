import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Props {
  exhibitionTitle: string
  onDelete: () => void
}

export default function ExhibitionDeleteDialog({ exhibitionTitle, onDelete }: Props) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    onDelete()
    setOpen(false)
  }

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        삭제
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>기획전 삭제</DialogTitle>
          </DialogHeader>
          <p className="py-4 text-sm">
            <strong>{exhibitionTitle}</strong> 기획전을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
