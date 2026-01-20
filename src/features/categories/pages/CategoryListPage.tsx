import { useCategoriesQuery } from '../hooks/query/useCategoriesQuery'
import CategoryTable from '../components/CategoryTable'
import CategoryAddButton from '../components/CategoryAddButton'

export default function CategoryListPage() {
  const { data: categories, isLoading, error } = useCategoriesQuery()

  if (isLoading) {
    return <p className="text-center py-20 text-sm text-muted-foreground">로딩 중...</p>
  }

  if (error) {
    return <p className="text-center text-destructive py-20">카테고리 불러오기 실패</p>
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">카테고리 목록</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">등록된 카테고리를 확인하고 관리하세요.</p>
        </div>
        <div className="w-full sm:w-auto">
          <CategoryAddButton />
        </div>
      </div>
      {categories && <CategoryTable categories={categories} />}
    </div>
  )
}
