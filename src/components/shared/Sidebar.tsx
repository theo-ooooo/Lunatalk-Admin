// src/components/shared/Sidebar.tsx
import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ShoppingCart,
  Tag,
  Users,
  Package,
  Calendar,
  MessageSquare,
} from 'lucide-react'

const menu = [
  { label: '대시보드', path: '/', icon: LayoutDashboard },
  { label: '주문 관리', path: '/orders', icon: ShoppingCart },
  { label: '카테고리 관리', path: '/categories', icon: Tag },
  { label: '회원 관리', path: '/members', icon: Users },
  { label: '상품 관리', path: '/products', icon: Package },
  { label: '기획전 관리', path: '/exhibitions', icon: Calendar },
  { label: '문의 관리', path: '/inquiries', icon: MessageSquare },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-sm">
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-gray-100">Lunatalk</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menu.map(({ label, path, icon: Icon }) => {
          const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group',
                isActive
                  ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 font-medium shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5 transition-colors',
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                )}
              />
              <span className="text-sm">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          <p className="font-medium">관리자 대시보드</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </aside>
  )
}
