import { productsKey } from '@/lib/constants/queryKeys/products'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../api/productApi'

export const useProductsQuery = (page: number, productName?: string, size = 10) => {
  return useQuery({
    queryKey: productsKey.all({ page, productName }),
    queryFn: () => getProducts({ page, productName, size }),
  })
}
