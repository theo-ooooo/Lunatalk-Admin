import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { DailyOrderCount } from '../interface'

interface OrderTrendChartProps {
  dailyOrderCounts: DailyOrderCount[]
}

export default function OrderTrendChart({ dailyOrderCounts }: OrderTrendChartProps) {
  if (!dailyOrderCounts || dailyOrderCounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>최근 7일 주문 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">데이터가 없습니다.</div>
        </CardContent>
      </Card>
    )
  }

  // 날짜 순서대로 정렬 (오래된 날짜부터)
  const sortedData = [...dailyOrderCounts].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  const chartData = sortedData.map((item) => {
    const dateObj = new Date(item.date + 'T00:00:00') // 시간을 명시적으로 추가하여 타임존 문제 방지
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const orderCount = typeof item.orderCount === 'number' ? item.orderCount : Number(item.orderCount) || 0
    return {
      date: `${month}/${day}`,
      주문수: orderCount,
    }
  })

  // 디버깅용 콘솔 로그 (개발 환경에서만)
  if (import.meta.env.DEV) {
    console.log('OrderTrendChart data:', { dailyOrderCounts, chartData })
  }

  const values = chartData.map((d) => d.주문수)
  const maxValue = values.length > 0 ? Math.max(...values, 1) : 10
  const yAxisMax = maxValue > 0 ? Math.ceil(maxValue * 1.2) : 10

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 7일 주문 추이</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, yAxisMax]} allowDecimals={false} />
            <Tooltip
              formatter={(value: number | undefined) => [`${value ?? 0}건`, '주문수']}
              labelFormatter={(label) => `날짜: ${label}`}
            />
            <Bar dataKey="주문수" fill="hsl(var(--chart-1))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

