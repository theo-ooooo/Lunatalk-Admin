import { useQuery } from '@tanstack/react-query'
import type { Category } from '../interface'
import { getCategories } from '../api/categoiresApi'

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  })
}
