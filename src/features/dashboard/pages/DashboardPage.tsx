import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Users, ShoppingCart, Calendar, Tag, BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600 mt-1">Lunatalk 관리자 대시보드에 오신 것을 환영합니다</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Clock className="w-4 h-4 mr-1" />
          준비중
        </Badge>
      </div>

      {/* 준비중 메시지 */}
      <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">대시보드 준비중</h2>
          <p className="text-gray-600 text-center max-w-md mb-6">
            통계 및 분석 데이터를 제공하는 대시보드를 준비하고 있습니다.
            <br />곧 만나보실 수 있습니다!
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>개발 진행중</span>
          </div>
        </CardContent>
      </Card>

      {/* 기능 미리보기 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 상품 관리 */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">상품 관리</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">-</div>
            <p className="text-xs text-muted-foreground">등록된 상품 수</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                준비중
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 회원 관리 */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">회원 관리</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">-</div>
            <p className="text-xs text-muted-foreground">등록된 회원 수</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                준비중
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 주문 관리 */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">주문 관리</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">-</div>
            <p className="text-xs text-muted-foreground">오늘 주문 수</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                준비중
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 기획전 관리 */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">기획전 관리</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">-</div>
            <p className="text-xs text-muted-foreground">진행중인 기획전</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                준비중
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 카테고리 관리 */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">카테고리 관리</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">-</div>
            <p className="text-xs text-muted-foreground">등록된 카테고리</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                준비중
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 매출 통계 */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">매출 통계</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">-</div>
            <p className="text-xs text-muted-foreground">오늘 매출</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                준비중
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 빠른 액션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
            빠른 액션
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Package className="w-6 h-6" />
              <span className="text-sm">상품 관리</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">회원 관리</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <ShoppingCart className="w-6 h-6" />
              <span className="text-sm">주문 관리</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">기획전 관리</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
