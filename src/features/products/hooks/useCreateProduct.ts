import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '../api/productApi'
import { useNavigate } from 'react-router'

export const useCreateProduct = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      navigate('/products')
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
