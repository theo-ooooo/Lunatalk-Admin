import { exhibitionsQueryKey } from '@/lib/constants/queryKeys/exhibitions'
import { useQuery } from '@tanstack/react-query'
import { getExhibitions } from '../../api/exhibitionApi'

export const useExhibitionsQuery = () => {
  const { data: exhibitions } = useQuery({
    queryKey: exhibitionsQueryKey.all,
    queryFn: getExhibitions,
  })

  return { exhibitions }
}
