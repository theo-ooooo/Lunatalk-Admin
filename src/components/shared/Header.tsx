// src/components/shared/Header.tsx
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { LogOut, Bell, Settings, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="fixed lg:static top-0 left-0 right-0 lg:left-auto lg:right-auto w-full h-14 sm:h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 shadow-sm z-30">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* 모바일 메뉴 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-600 dark:text-gray-400"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">관리자 대시보드</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* 알림 버튼 (향후 구현) */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hidden sm:flex"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* 설정 버튼 (향후 구현) */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hidden sm:flex"
        >
          <Settings className="w-5 h-5" />
        </Button>

        {/* 로그아웃 버튼 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/logout')}
          className="gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">로그아웃</span>
        </Button>
      </div>
    </header>
  )
}
