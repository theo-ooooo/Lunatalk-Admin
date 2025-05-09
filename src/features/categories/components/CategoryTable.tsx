import type { Category } from '../interface'
import CategoryDeleteButton from './CategoryDeleteButton'
import CategoryEditButton from './CategoryEditButton'
import { Badge } from '@/components/ui/badge'

interface Props {
  categories: Category[]
}

export default function CategoryTable({ categories }: Props) {
  if (categories.length === 0) {
    return <div className="border rounded-xl p-10 text-center text-muted-foreground bg-white shadow-sm">등록된 카테고리가 없습니다.</div>
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-muted-foreground">ID</th>
            <th className="px-6 py-3 text-left font-semibold text-muted-foreground">카테고리명</th>
            <th className="px-6 py-3 text-left font-semibold text-muted-foreground">상태</th>
            <th className="px-6 py-3 text-left font-semibold text-muted-foreground">노출</th>
            <th className="px-6 py-3 text-center font-semibold text-muted-foreground">액션</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.categoryId} className="border-b last:border-none hover:bg-muted/10 transition-colors">
              <td className="px-6 py-4 text-muted-foreground">{cat.categoryId}</td>
              <td className="px-6 py-4 font-medium">{cat.categoryName}</td>
              <td className="px-6 py-4">
                <Badge variant={cat.status === 'ACTIVE' ? 'default' : 'outline'}>{cat.status}</Badge>
              </td>
              <td className="px-6 py-4">
                <Badge variant={cat.visibility === 'VISIBLE' ? 'secondary' : 'outline'}>{cat.visibility}</Badge>
              </td>
              <td className="px-6 py-4 text-right space-x-2 flex gap-3 justify-center">
                <CategoryEditButton categoryId={cat.categoryId} />
                <CategoryDeleteButton categoryId={cat.categoryId} categoryName={cat.categoryName} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
