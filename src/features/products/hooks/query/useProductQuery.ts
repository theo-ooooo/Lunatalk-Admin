import { productsKey } from '@/lib/constants/queryKeys/products'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../../api/productApi'

// TODO: 이구조로 나머지 다 리팩토링.
export const useProductQuery = (productId: number) => {
  const { data: product } = useQuery({
    queryKey: productsKey.detail(productId),
    queryFn: () => getProduct({ productId }),
  })

  return {
    product,
  }
}
