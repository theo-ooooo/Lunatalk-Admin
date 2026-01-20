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
        <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{value}</div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

