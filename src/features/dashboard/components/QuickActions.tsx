import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Users, ShoppingCart, Calendar, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function QuickActions() {
  const navigate = useNavigate()

  const actions = [
    { icon: Package, label: '상품 관리', path: '/products' },
    { icon: Users, label: '회원 관리', path: '/members' },
    { icon: ShoppingCart, label: '주문 관리', path: '/orders' },
    { icon: Calendar, label: '기획전 관리', path: '/exhibitions' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
          빠른 액션
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.path}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => navigate(action.path)}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

