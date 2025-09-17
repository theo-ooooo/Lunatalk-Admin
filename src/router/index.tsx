import { createBrowserRouter } from 'react-router'
import AdminLayout from '@Layouts/AdminLayout'
import LoginPage from '@/features/auth/pages/LoginPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import ProductListPage from '@/features/products/pages/ProductListPage'
import MemberListPage from '@/features/members/pages/MemberListPage'
import OrderListPage from '@/features/orders/pages/OrderListPage'
import CategoryListPage from '@/features/categories/pages/CategoryListPage'
import RedirectIfAuthenticated from '@/features/auth/RedirectIfAuthenticated'
import RequireAuth from '@/features/auth/RequireAuth'
import LogoutPage from '@/features/auth/pages/LogoutPage'
import MemberDetailPage from '@/features/members/pages/MemberDeatailPage'
import OrderDetailPage from '@/features/orders/pages/OrderDetailPage'
import ProductCreatePage from '@/features/products/pages/ProductCreatePage'
import ProductDetailPage from '@/features/products/pages/ProductDetailPage'
import ExhibitionListPage from '@/features/exhibitions/pages/ExhibitionListPage'
import ExhibitionCreatePage from '@/features/exhibitions/pages/ExhibitionCreatePage'

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
            path: '/products/new',
            element: <ProductCreatePage />,
          },
          {
            path: '/products/:id',
            element: <ProductDetailPage />,
          },
          {
            path: '/members',
            element: <MemberListPage />,
          },
          {
            path: '/members/:id',
            element: <MemberDetailPage />,
          },
          {
            path: '/orders',
            element: <OrderListPage />,
          },
          {
            path: '/orders/:orderNumber',
            element: <OrderDetailPage />,
          },
          {
            path: '/categories',
            element: <CategoryListPage />,
          },
          {
            path: '/exhibitions',
            element: <ExhibitionListPage />,
          },
          {
            path: '/exhibitions/create',
            element: <ExhibitionCreatePage />,
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
