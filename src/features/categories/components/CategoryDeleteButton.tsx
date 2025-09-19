import { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

import { useCategoryMutations } from '../hooks/useCategoryMutations'

interface Props {
  categoryId: number
  categoryName: string
}

export default function CategoryDeleteButton({ categoryId, categoryName }: Props) {
  const [open, setOpen] = useState(false)

  const {
    deleteMutation: { mutate, isPending },
  } = useCategoryMutations()

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)} className="flex items-center gap-1">
        <Trash2 className="w-4 h-4" /> 삭제
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>‘{categoryName}’ 카테고리를 삭제할까요?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutate(categoryId)} disabled={isPending}>
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
