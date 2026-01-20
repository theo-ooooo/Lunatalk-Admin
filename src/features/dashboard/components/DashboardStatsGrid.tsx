import { Package, Users, ShoppingCart, Calendar, Tag, TrendingUp } from 'lucide-react'
import StatCard from './StatCard'
import type { DashboardResponse } from '../interface'

interface DashboardStatsGridProps {
  dashboard: DashboardResponse
  formatNumber: (num: number) => string
  formatCurrency: (num: number) => string
}

export default function DashboardStatsGrid({ dashboard, formatNumber, formatCurrency }: DashboardStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <StatCard
        title="상품 관리"
        value={formatNumber(dashboard.productCount)}
        description="등록된 상품 수"
        icon={Package}
      />
      <StatCard
        title="회원 관리"
        value={formatNumber(dashboard.memberCount)}
        description="등록된 회원 수"
        icon={Users}
      />
      <StatCard
        title="주문 관리"
        value={formatNumber(dashboard.todayOrderCount)}
        description="오늘 주문 수"
        icon={ShoppingCart}
      />
      <StatCard
        title="기획전 관리"
        value={formatNumber(dashboard.activeExhibitionCount)}
        description="진행중인 기획전"
        icon={Calendar}
      />
      <StatCard
        title="카테고리 관리"
        value={formatNumber(dashboard.categoryCount)}
        description="등록된 카테고리"
        icon={Tag}
      />
      <StatCard
        title="매출 통계"
        value={formatCurrency(dashboard.todaySales)}
        description="오늘 매출"
        icon={TrendingUp}
      />
    </div>
  )
}

