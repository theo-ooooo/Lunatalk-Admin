import { Link } from 'react-router'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useExhibitionsQuery } from '../hooks/query/useExhibitionsQuery'
import dayjs from 'dayjs'
import ExhibitionDeleteDialog from '../components/ExhibitionDeleteDialog'
import { exhibitionMutation } from '../hooks/mutation/exhibition'

export default function ExhibitionListPage() {
  const { exhibitions } = useExhibitionsQuery()
  const { deleteMutate } = exhibitionMutation()

  const handleDelete = (exhibitionId: number) => {
    deleteMutate(exhibitionId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">기획전 목록</h2>
          <p className="text-sm text-muted-foreground">등록된 기획전을 확인하고 관리할 수 있습니다.</p>
        </div>
        <Link to="/exhibitions/create">
          <Button size="lg">+ 기획전 추가</Button>
        </Link>
      </div>

      {!exhibitions || exhibitions.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm p-16">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">등록된 기획전이 없습니다</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">새로운 기획전을 추가해보세요.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">제목</TableHead>
                  <TableHead className="w-[300px] font-semibold text-gray-700 dark:text-gray-300">기간</TableHead>
                  <TableHead className="w-[120px] font-semibold text-gray-700 dark:text-gray-300">노출 여부</TableHead>
                  <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300 text-center">상품 수</TableHead>
                  <TableHead className="w-[200px] font-semibold text-gray-700 dark:text-gray-300 text-center">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exhibitions.map((exhibition) => (
                  <TableRow key={exhibition.exhibitionId} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <TableCell>
                      <Link
                        to={`/exhibitions/${exhibition.exhibitionId}`}
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {exhibition.title}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {dayjs(exhibition.startAt).format('YYYY-MM-DD HH:mm')} ~{' '}
                      {exhibition.endAt ? dayjs(exhibition.endAt).format('YYYY-MM-DD HH:mm') : '무기한'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={exhibition.visibility === 'VISIBLE' ? 'default' : 'outline'} className="text-xs font-normal">
                        {exhibition.visibility === 'VISIBLE' ? '노출' : '비노출'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-xs font-normal">
                        {exhibition.products.length}개
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Link to={`/exhibitions/${exhibition.exhibitionId}`}>
                          <Button variant="outline" size="sm">
                            상세보기
                          </Button>
                        </Link>
                        <ExhibitionDeleteDialog exhibitionTitle={exhibition.title} onDelete={() => handleDelete(exhibition.exhibitionId)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}
