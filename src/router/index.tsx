import { createBrowserRouter } from 'react-router'
import AdminLayout from '@/layouts/AdminLayout'
import LoginPage from '@/features/auth/pages/LoginPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import ProductListPage from '@/features/products/pages/ProductListPage'
import MemberListPage from '@/features/members/pages/MemberListPage'
import OrderListPage from '@/features/orders/pages/OrderListPage'
import CategoryListPage from '@/features/categories/pages/CategoryListPage'
import RedirectIfAuthenticated from '@/features/auth/RedirectIfAuthenticated'
import RequireAuth from '@/features/auth/RequireAuth'
import LogoutPage from '@/features/auth/pages/LogoutPage'

export const router = createBrowserRouter([
  {
    element: <RequireAuth />,
    children: [
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
        path: '/logout',
        element: <LogoutPage />,
      },
    ],
  },
  {
    element: <RedirectIfAuthenticated />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
])
