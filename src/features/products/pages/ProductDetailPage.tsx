import { useParams } from 'react-router'
import { useProductQuery } from '../hooks/query/useProductQuery'
import { Suspense } from 'react'
import ProductDetailForm from '../components/ProductDetailForm'
import ProductImageUploader from '../components/ProductImageUploader'
import { useQueryClient } from '@tanstack/react-query'
import { productsKey } from '@/lib/constants/queryKeys/products'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()

  const productId = Number(id)

  const { product } = useProductQuery(productId)
  const queryClient = useQueryClient()

  const productInvalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: productsKey.detail(productId) })
  }

  return (
    <Suspense fallback={<div>로딩중..</div>}>
      {!product ? (
        <p>존재 하지 않는 상품입니다.</p>
      ) : (
        <div className="bg-white p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">상품 정보 수정</h2>
          </div>
          <ProductDetailForm product={product} />
          <ProductImageUploader
            productId={product.productId}
            imageType="PRODUCT_THUMBNAIL"
            label="썸네일 이미지 업로드"
            initialImages={product.images.filter((img) => img.imageType === 'PRODUCT_THUMBNAIL')}
            multiple
            onSuccess={() => {
              productInvalidateQueries()
            }}
          />
          <ProductImageUploader
            productId={product.productId}
            imageType="PRODUCT_CONTENT"
            label="상세 이미지 업로드"
            initialImages={product.images.filter((img) => img.imageType === 'PRODUCT_CONTENT')}
            multiple
            onSuccess={() => {
              productInvalidateQueries()
            }}
          />
        </div>
      )}
    </Suspense>
  )
}
