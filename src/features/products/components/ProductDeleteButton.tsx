import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import productMutation from '../hooks/mutation/product'

interface Props {
  productId: number
}

export default function ProductDeleteButton({ productId }: Props) {
  const { deleteMutate } = productMutation(productId)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">상품 삭제</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">삭제한 상품은 복구할 수 없습니다.</p>
        <DialogFooter>
          <Button variant="outline" asChild>
            <DialogTrigger>취소</DialogTrigger>
          </Button>
          <Button variant="destructive" onClick={() => deleteMutate()}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
