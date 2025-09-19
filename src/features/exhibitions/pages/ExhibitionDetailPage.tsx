import { useNavigate, useParams } from 'react-router'
import { useExhibitionDetail } from '../hooks/useExhibitionDetail'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Eye, EyeOff, Edit } from 'lucide-react'
import dayjs from 'dayjs'
import { Link } from 'react-router'
import ExhibitionDeleteDialog from '../components/ExhibitionDeleteDialog'
import { exhibitionMutation } from '../hooks/mutation/exhibition'
export default function ExhibitionDetailPage() {
  const { exhibitionId } = useParams<{ exhibitionId: string }>()
  const navigate = useNavigate()

  const { data: exhibition, isLoading, error } = useExhibitionDetail(Number(exhibitionId))
  const { deleteMutate } = exhibitionMutation()

  const handleDelete = (exhibitionId: number) => {
    deleteMutate(exhibitionId)
    navigate('/exhibitions')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  if (error || !exhibition) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">전시회를 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{exhibition.title}</h1>
          <p className="text-muted-foreground mt-2">{exhibition.description}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to={`/exhibitions/${exhibitionId}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              수정
            </Link>
          </Button>
          <ExhibitionDeleteDialog exhibitionTitle={exhibition.title} onDelete={() => handleDelete(exhibition.exhibitionId)} />
        </div>
      </div>

      {/* 기본 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>전시회 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">시작일:</span>
              <span>{dayjs(exhibition.startAt).format('YYYY-MM-DD HH:mm')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">종료일:</span>
              <span>{dayjs(exhibition.endAt).format('YYYY-MM-DD HH:mm')}</span>
            </div>
            <div className="flex items-center gap-2">
              {exhibition.visibility === 'VISIBLE' ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-red-500" />}
              <span className="font-medium">공개 상태:</span>
              <Badge variant={exhibition.visibility === 'VISIBLE' ? 'default' : 'secondary'}>{exhibition.visibility === 'VISIBLE' ? '공개' : '비공개'}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 전시 상품 */}
      <Card>
        <CardHeader>
          <CardTitle>전시 상품 ({exhibition.products.length}개)</CardTitle>
        </CardHeader>
        <CardContent>
          {exhibition.products.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">전시 상품이 없습니다.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exhibition.products
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((exhibitionProduct) => (
                  <Card key={exhibitionProduct.product.productId} className="overflow-hidden">
                    <div className="aspect-square bg-muted">
                      {exhibitionProduct.product.images && exhibitionProduct.product.images.length > 0 ? (
                        <img
                          src={`https://lunatalk-images.s3.ap-northeast-2.amazonaws.com/${(exhibitionProduct.product.images[0] as any).imagePath}`}
                          alt={exhibitionProduct.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">이미지 없음</div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium truncate">{exhibitionProduct.product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{exhibitionProduct.product.price.toLocaleString()}원</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline">순서: {exhibitionProduct.sortOrder}</Badge>
                        <Button asChild size="sm" variant="outline">
                          <Link to={`/products/${exhibitionProduct.product.productId}`}>상세보기</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
