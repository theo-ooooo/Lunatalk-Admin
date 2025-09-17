import { Navigate, Outlet, useLocation } from 'react-router'

export default function RequireAuth() {
  const token = localStorage.getItem('accessToken')
  const location = useLocation()

  if (!token) {
    // 로그인 안 된 경우: 로그인 페이지로 이동 (현재 위치 기억)
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 로그인 된 경우: 자식 라우트 렌더링
  return <Outlet />
}
