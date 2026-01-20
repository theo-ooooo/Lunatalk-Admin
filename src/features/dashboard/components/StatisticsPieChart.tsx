import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { DashboardResponse } from '../interface'

interface StatisticsPieChartProps {
  dashboard: DashboardResponse
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
]

export default function StatisticsPieChart({ dashboard }: StatisticsPieChartProps) {
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
        <CardTitle>통계 비율</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

