import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct, deleteProduct, updatePorduct } from '../../api/productApi'
import { useNavigate } from 'react-router'
import type { FormValues, ProductCreateAndUpdateRequest } from '../../interface'

const productMutation = (productId?: number) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const redirectOnSuccess = () => {
    navigate('/products')
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }

  const { mutate: createMutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: redirectOnSuccess,
  })
  const { mutate: updateMutate } = useMutation<void, Error, FormValues>({
    mutationFn: async (data: FormValues) => {
      if (!productId) return

      const updatedData: ProductCreateAndUpdateRequest = {
        ...data,
        colors: data.colors.map((c) => c.value),
      }
      return updatePorduct({ ...updatedData, productId })
    },
  })
  const { mutate: deleteMutate } = useMutation({
    mutationFn: async () => {
      if (!productId) return
      deleteProduct({ productId })
    },
    onSuccess: redirectOnSuccess,
  })

  return {
    createMutate,
    updateMutate,
    deleteMutate,
  }
}

export default productMutation
