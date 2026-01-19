// src/layouts/AdminLayout.tsx
import Sidebar from '@/components/shared/Sidebar'
import Header from '@/components/shared/Header'
import { Outlet } from 'react-router'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
