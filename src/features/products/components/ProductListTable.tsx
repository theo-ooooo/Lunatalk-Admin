import { useNavigate } from 'react-router'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import type { Product } from '../interface'

interface Props {
  products: Product[]
}

export default function ProductListTable({ products }: Props) {
  const navigate = useNavigate()

  if (products.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm p-16">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">상품이 없습니다</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">새로운 상품을 등록해보세요.</p>
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
              <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">썸네일</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300">상품명</TableHead>
              <TableHead className="w-[120px] font-semibold text-gray-700 dark:text-gray-300">가격</TableHead>
              <TableHead className="w-[140px] font-semibold text-gray-700 dark:text-gray-300">카테고리</TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-300">색상</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const thumbnail = product.images.find((img) => img.imageType === 'PRODUCT_THUMBNAIL')?.imageUrl
              return (
                <TableRow
                  key={product.productId}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b"
                  onClick={() => navigate(`/products/${product.productId}`)}
                >
                  <TableCell>
                    {thumbnail ? (
                      <img
                        src={`https://lunatalk-images.s3.ap-northeast-2.amazonaws.com/${thumbnail}`}
                        alt="썸네일"
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700">
                        없음
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{product.price.toLocaleString()}원</span>
                  </TableCell>
                  <TableCell>
                    {product.category?.categoryName ? (
                      <Badge variant="outline" className="text-xs font-normal">
                        {product.category.categoryName}
                      </Badge>
                    ) : (
                      <span className="text-xs text-gray-400">없음</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.colors.length > 0 ? (
                        product.colors.map((color, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs font-normal">
                            {color}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
