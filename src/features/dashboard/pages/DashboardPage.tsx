import { useDashboardQuery } from '../hooks/query/useDashboardQuery'
import FullPageLoader from '@/components/feedback/FullPageLoader'
import DashboardHeader from '../components/DashboardHeader'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import OrderTrendChart from '../components/OrderTrendChart'
import QuickActions from '../components/QuickActions'

export default function DashboardPage() {
  const { data: dashboard, isLoading } = useDashboardQuery()

  if (isLoading) {
    return <FullPageLoader />
  }

  if (!dashboard) {
    return null
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(num)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStatsGrid dashboard={dashboard} formatNumber={formatNumber} formatCurrency={formatCurrency} />
      <OrderTrendChart dailyOrderCounts={dashboard.dailyOrderCounts} />
      <QuickActions />
    </div>
  )
}
