import { dashboardKey } from '@/lib/constants/queryKeys/dashboard'
import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '../../api/dashboardApi'

export const useDashboardQuery = () => {
  return useQuery({
    queryKey: dashboardKey.all(),
    queryFn: () => getDashboard(),
  })
}

