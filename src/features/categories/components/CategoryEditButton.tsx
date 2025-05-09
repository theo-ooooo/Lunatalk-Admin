import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Pencil } from 'lucide-react'
import { useCategoryMutations } from '../hooks/useCategoryMutations'
import { useCategory } from '../hooks/useCategory'
import { VISIBILITY } from '../interface'

interface Props {
  categoryId: number
}

export default function CategoryEditDialog({ categoryId }: Props) {
  const [open, setOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [visibility, setVisibility] = useState<VISIBILITY>(VISIBILITY.HIDDEN)
  const { data: category } = useCategory({ categoryId })
  const {
    updateMutation: { mutate, isPending },
  } = useCategoryMutations()

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryName)
      setVisibility(category.visibility)
    }
  }, [category])

  const handleOnClick = () => {
    mutate({ categoryId, categoryName, visibility })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Pencil className="w-4 h-4" /> 수정
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>카테고리 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="edit-name">카테고리명</Label>
            <Input id="edit-name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit-visibility">노출 여부</Label>
            <Select value={visibility} onValueChange={(val) => setVisibility(val as VISIBILITY)}>
              <SelectTrigger id="edit-visibility">
                <SelectValue placeholder="노출 여부 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VISIBLE">노출</SelectItem>
                <SelectItem value="HIDDEN">비노출</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleOnClick} disabled={isPending}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
