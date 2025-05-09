import { useCategories } from '../hooks/useCategories'
import CategoryTable from '../components/CategoryTable'
import CategoryAddButton from '../components/CategoryAddButton'

export default function CategoryListPage() {
  const { data: categories, isLoading, error } = useCategories()

  if (isLoading) {
    return <p className="text-center py-20 text-sm text-muted-foreground">로딩 중...</p>
  }

  if (error) {
    return <p className="text-center text-destructive py-20">카테고리 불러오기 실패</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">카테고리 목록</h1>
        <p className="text-muted-foreground text-sm mt-1">등록된 카테고리를 확인하고 관리하세요.</p>
      </div>
      <div className="flex justify-end mb-4">
        <CategoryAddButton />
      </div>
      {categories && <CategoryTable categories={categories} />}
    </div>
  )
}
