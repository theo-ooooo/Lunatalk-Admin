import { useFormContext } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCategoriesQuery } from '@/features/categories/hooks/query/useCategoriesQuery'

export function CategorySelect() {
  const { data: categories = [] } = useCategoriesQuery()
  const form = useFormContext()
  if (!form) return null // 혹은 fallback 처리

  const selectedCategoryId = form.watch('categoryId')

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">카테고리</label>
      <Select value={selectedCategoryId?.toString() ?? ''} onValueChange={(value) => form.setValue('categoryId', Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="카테고리를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.categoryId} value={category.categoryId.toString()}>
              {category.categoryName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
