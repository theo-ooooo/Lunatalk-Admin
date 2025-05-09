import { createBrowserRouter } from 'react-router'
import AdminLayout from '@/layouts/AdminLayout'
import LoginPage from '@/features/auth/pages/LoginPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import ProductListPage from '@/features/products/pages/ProductListPage'
import MemberListPage from '@/features/members/pages/MemberListPage'
import OrderListPage from '@/features/orders/pages/OrderListPage'
import CategoryListPage from '@/features/categories/pages/CategoryListPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '/products',
        element: <ProductListPage />,
      },
      {
        path: '/members',
        element: <MemberListPage />,
      },
      {
        path: '/orders',
        element: <OrderListPage />,
      },
      {
        path: '/categories',
        element: <CategoryListPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
