// src/layouts/AdminLayout.tsx
import Sidebar from '@/components/shared/Sidebar'
import Header from '@/components/shared/Header'
import { Outlet } from 'react-router'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-muted flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
