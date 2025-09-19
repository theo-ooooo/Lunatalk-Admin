import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createExhibition, deleteExhibition } from '../../api/exhibitionApi'
import { exhibitionsQueryKey } from '@/lib/constants/queryKeys/exhibitions'
import type { CreateExhibitionRequest } from '../../interface'
import { useNavigate } from 'react-router'

export const exhibitionMutation = () => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (exhibitionId: number) => deleteExhibition({ exhibitionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exhibitionsQueryKey.all })
    },
  })

  const { mutate: createMutate } = useMutation({
    mutationFn: (request: CreateExhibitionRequest) => createExhibition(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exhibitionsQueryKey.all })
      navigate('/exhibitions')
    },
  })

  return {
    createMutate,
    deleteMutate,
  }
}
