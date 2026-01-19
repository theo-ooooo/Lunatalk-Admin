import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import type { Category } from '../interface'
import CategoryDeleteButton from './CategoryDeleteButton'
import CategoryEditButton from './CategoryEditButton'

interface Props {
  categories: Category[]
}

export default function CategoryTable({ categories }: Props) {
  if (categories.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm p-16">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">등록된 카테고리가 없습니다</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">새로운 카테고리를 추가해보세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800/50">
              <TableHead className="w-[80px] font-semibold text-gray-700 dark:text-gray-300">ID</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300">카테고리명</TableHead>
              <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">상태</TableHead>
              <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">노출</TableHead>
              <TableHead className="w-[120px] font-semibold text-gray-700 dark:text-gray-300">상품 갯수</TableHead>
              <TableHead className="w-[180px] font-semibold text-gray-700 dark:text-gray-300 text-center">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.categoryId} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <TableCell className="font-mono text-xs text-gray-500 dark:text-gray-400">#{cat.categoryId}</TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{cat.categoryName}</TableCell>
                <TableCell>
                  <Badge variant={cat.status === 'ACTIVE' ? 'default' : 'outline'} className="text-xs font-normal">
                    {cat.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={cat.visibility === 'VISIBLE' ? 'secondary' : 'outline'} className="text-xs font-normal">
                    {cat.visibility}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs font-normal">
                    {cat.productCount || 0}개
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-center">
                    <CategoryEditButton categoryId={cat.categoryId} />
                    <CategoryDeleteButton categoryId={cat.categoryId} categoryName={cat.categoryName} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
