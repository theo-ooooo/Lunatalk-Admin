import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { DashboardResponse } from '../interface'

interface StatisticsBarChartProps {
  dashboard: DashboardResponse
}

export default function StatisticsBarChart({ dashboard }: StatisticsBarChartProps) {
  const data = [
    { name: '상품', value: dashboard.productCount },
    { name: '회원', value: dashboard.memberCount },
    { name: '오늘 주문', value: dashboard.todayOrderCount },
    { name: '기획전', value: dashboard.activeExhibitionCount },
    { name: '카테고리', value: dashboard.categoryCount },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>주요 통계 분포</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="hsl(var(--chart-1))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

