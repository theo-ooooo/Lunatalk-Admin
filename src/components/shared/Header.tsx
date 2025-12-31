// src/components/shared/Header.tsx
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { LogOut, Bell, Settings } from 'lucide-react'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">관리자 대시보드</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* 알림 버튼 (향후 구현) */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* 설정 버튼 (향후 구현) */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <Settings className="w-5 h-5" />
        </Button>

        {/* 로그아웃 버튼 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/logout')}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          로그아웃
        </Button>
      </div>
    </header>
  )
}
