import { useQuery } from '@tanstack/react-query'
import type { Category } from '../../interface'
import { getCategories } from '../../api/categoiresApi'
import categoriesKey from '@/lib/constants/queryKeys/categories'

export const useCategoriesQuery = () => {
  return useQuery<Category[]>({
    queryKey: categoriesKey.all,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  })
}
