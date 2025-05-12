import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory, deleteCategory, updateCategory } from '../api/categoiresApi'
import type { VISIBILITY } from '../interface'
import categoriesKey from '@/lib/constants/queryKeys/categories'

export function useCategoryMutations() {
  const queryClient = useQueryClient()

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: categoriesKey.all })
  }

  const createMutation = useMutation({
    mutationFn: async (data: { categoryName: string; visibility: VISIBILITY }) => {
      await createCategory(data)
    },
    onSuccess: invalidateQueries,
  })

  const deleteMutation = useMutation({
    mutationFn: async (categoryId: number) => {
      await deleteCategory(categoryId)
    },
    onSuccess: invalidateQueries,
  })

  const updateMutation = useMutation({
    mutationFn: async (data: { categoryId: number; categoryName: string; visibility: VISIBILITY }) => {
      const { categoryId, ...rest } = data
      await updateCategory({ categoryId, ...rest })
    },
    onSuccess: invalidateQueries,
  })

  return {
    createMutation,
    deleteMutation,
    updateMutation,
  }
}
