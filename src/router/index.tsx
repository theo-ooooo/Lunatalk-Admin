import { createBrowserRouter } from 'react-router'
import AdminLayout from '@Layouts/AdminLayout'
import LoginPage from '@Features/auth/pages/LoginPage'
import DashboardPage from '@Features/dashboard/pages/DashboardPage'
import ProductListPage from '@Features/products/pages/ProductListPage'
import MemberListPage from '@Features/members/pages/MemberListPage'
import OrderListPage from '@Features/orders/pages/OrderListPage'
import CategoryListPage from '@Features/categories/pages/CategoryListPage'

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
