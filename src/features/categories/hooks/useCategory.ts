import { useQuery } from '@tanstack/react-query'
import { getCategory } from '../api/categoiresApi'
import categoriesKey from '@/lib/constants/queryKeys/categories'

export const useCategory = ({ categoryId }: { categoryId: number }) => {
  return useQuery({
    queryKey: categoriesKey.detail(categoryId),
    queryFn: () => getCategory({ categoryId }),
    staleTime: 1000 * 60 * 5,
  })
}
