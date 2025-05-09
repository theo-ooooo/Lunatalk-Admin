// src/components/shared/Sidebar.tsx
import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils'

const menu = [
  { label: '대시보드', path: '/' },
  { label: '주문 관리', path: '/orders' },
  { label: '카테고리 관리', path: '/categories' },
  { label: '회원 관리', path: '/members' },
  { label: '상품 관리', path: '/products' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-60 h-screen bg-gray-100 dark:bg-gray-900 border-r p-4">
      <h1 className="text-xl font-bold mb-6">Admin</h1>
      <nav className="flex flex-col gap-2">
        {menu.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className={cn('px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-all', location.pathname === path && 'bg-gray-300 dark:bg-gray-700 font-semibold')}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
