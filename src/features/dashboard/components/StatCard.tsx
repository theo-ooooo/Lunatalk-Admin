import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ComponentType } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: ComponentType<{ className?: string }>
}

export default function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

