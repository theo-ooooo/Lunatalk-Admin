// src/components/auth/RedirectIfAuthenticated.tsx
import { Navigate, Outlet } from 'react-router'

export default function RedirectIfAuthenticated() {
  const token = localStorage.getItem('accessToken')
  if (token) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
