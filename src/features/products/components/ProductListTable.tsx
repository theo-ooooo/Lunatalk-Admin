import { Link } from 'react-router'
import type { Product } from '../interface'

interface Props {
  products: Product[]
}

export default function ProductListTable({ products }: Props) {
  if (products.length === 0) return <p className="text-muted-foreground">상품이 없습니다.</p>

  return (
    <>
      <table className="w-full text-sm border bg-white">
        <thead>
          <tr>
            <th className="p-2 text-left">썸네일</th>
            <th className="p-2 text-left">상품명</th>
            <th className="p-2 text-left">가격</th>
            <th className="p-2 text-left">카테고리</th>
            <th className="p-2 text-left">색상</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const thumbnail = product.images.find((img) => img.imageType === 'PRODUCT_THUMBNAIL')?.imageUrl
            return (
              <tr key={product.productId} className="border-t hover:bg-gray-50 transition">
                <td className="p-2">
                  <Link to={`/products/${product.productId}`} className="block">
                    {thumbnail ? (
                      <img src={`https://lunatalk-images.s3.ap-northeast-2.amazonaws.com/${thumbnail}`} alt="썸네일" className="w-16 h-16 object-cover rounded" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">없음</div>
                    )}
                  </Link>
                </td>
                <td className="p-2">
                  <Link to={`/products/${product.productId}`} className="text-blue-600 hover:underline">
                    {product.name}
                  </Link>
                </td>
                <td className="p-2">{product.price.toLocaleString()}원</td>
                <td className="p-2">
                  {product.category?.categoryName ? (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">{product.category.categoryName}</span>
                  ) : (
                    <span className="text-muted-foreground text-xs">없음</span>
                  )}
                </td>

                <td className="p-2">{product.colors.length > 0 ? product.colors.join(', ') : '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
