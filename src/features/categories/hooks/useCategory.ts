import { useQuery } from '@tanstack/react-query'
import { getCategory } from '../api/categoiresApi'

export const useCategory = ({ categoryId }: { categoryId: number }) => {
  return useQuery({
    queryKey: [`categories/${categoryId}`],
    queryFn: () => getCategory({ categoryId }),
    staleTime: 1000 * 60 * 5,
  })
}
