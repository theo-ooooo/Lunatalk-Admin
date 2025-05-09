// src/components/shared/Header.tsx
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="w-full h-14 bg-white dark:bg-gray-950 border-b flex items-center justify-between px-4">
      <span className="font-medium">관리자 페이지</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // 로그아웃 처리 등 여기에
          navigate('/login')
        }}
      >
        로그아웃
      </Button>
    </header>
  )
}
