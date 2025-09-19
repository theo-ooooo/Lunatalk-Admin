import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ProductImageDeleteButtonProps {
  onConfirm: () => void
}

export default function ProductImageDeleteButton({ onConfirm }: ProductImageDeleteButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute top-1 right-1 bg-white text-red-500 rounded-full px-2 text-xs shadow hover:bg-red-50">✕</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">이 이미지는 삭제되며 복구할 수 없습니다.</p>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="outline">취소</Button>
          </DialogTrigger>
          <Button variant="destructive" onClick={onConfirm}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
