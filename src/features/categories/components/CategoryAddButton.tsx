import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { useCategoryMutations } from '../hooks/useCategoryMutations'
import { VISIBILITY } from '../interface'

export default function CategoryAddButton() {
  const [open, setOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [visibility, setVisibility] = useState<VISIBILITY>(VISIBILITY.HIDDEN)

  const {
    createMutation: { mutate, isPending },
  } = useCategoryMutations()

  const handleOnClick = () => {
    mutate({ categoryName, visibility })
    setOpen(false)
    setVisibility(VISIBILITY.HIDDEN)
    setCategoryName('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <Plus className="w-4 h-4" /> 카테고리 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>카테고리 추가</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="name">카테고리명</Label>
            <Input id="name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="예: 액세서리" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="visibility">노출 여부</Label>
            <Select value={visibility} onValueChange={(val) => setVisibility(val as VISIBILITY)}>
              <SelectTrigger id="visibility">
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
            추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
