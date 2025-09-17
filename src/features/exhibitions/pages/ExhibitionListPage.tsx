import { Link } from 'react-router'
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">기획전 목록</h2>
        <Link to="/exhibitions/create">
          <Button>+ 기획전 추가</Button>
        </Link>
      </div>

      <table className="w-full border text-sm bg-white rounded-md shadow">
        <thead>
          <tr className="bg-muted text-muted-foreground">
            <th className="p-2 text-left">제목</th>
            <th className="p-2 text-left">기간</th>
            <th className="p-2 text-left">노출 여부</th>
            <th className="p-2 text-left">상품 수</th>
            <th className="p-2 text-left">관리</th>
          </tr>
        </thead>
        <tbody>
          {exhibitions?.map((exhibition) => (
            <tr key={exhibition.exhibitionId} className="border-t">
              <td className="p-2">
                <Link to={`/exhibitions/${exhibition.exhibitionId}`} className="hover:underline">
                  {exhibition.title}
                </Link>
              </td>
              <td className="p-2">
                {dayjs(exhibition.startAt).format('YYYY-MM-DD HH:mm:ss')} ~ {exhibition.endAt && dayjs(exhibition.endAt).format('YYYY-MM-DD HH:mm:ss')}
              </td>
              <td className="p-2">
                <Badge variant={exhibition.visibility ? 'default' : 'outline'}>{exhibition.visibility === 'VISIBLE' ? '노출' : '비노출'}</Badge>
              </td>
              <td className="p-2 text-center">{exhibition.products.length}</td>
              <td className="p-2 flex gap-2">
                <Link to={`/exhibitions/${exhibition.exhibitionId}`}>
                  <Button variant="outline" size="sm">
                    상세보기
                  </Button>
                </Link>
                <ExhibitionDeleteDialog exhibitionTitle={exhibition.title} onDelete={() => handleDelete(exhibition.exhibitionId)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
