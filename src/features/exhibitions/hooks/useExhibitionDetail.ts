import { useQuery } from '@tanstack/react-query'
import { getExhibition } from '../api/exhibitionApi'
import { exhibitionKeys } from '@/lib/constants/queryKeys/exhibitions'

export function useExhibitionDetail(exhibitionId: number) {
  return useQuery({
    queryKey: exhibitionKeys.detail(exhibitionId),
    queryFn: () => getExhibition(exhibitionId),
    enabled: !!exhibitionId,
  })
}
