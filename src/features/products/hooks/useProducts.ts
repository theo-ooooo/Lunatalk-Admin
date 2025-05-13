import { productsKey } from '@/lib/constants/queryKeys/products'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/productApi'

export const useProducts = (page: number, productName?: string) => {
  return useQuery({
    queryKey: productsKey.all({ page, productName }),
    queryFn: () => getProducts({ page, productName }),
  })
}
