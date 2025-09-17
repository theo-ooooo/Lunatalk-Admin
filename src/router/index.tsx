import { createBrowserRouter } from 'react-router'
import AdminLayout from '@Layouts/AdminLayout'
import LoginPage from '@Features/auth/pages/LoginPage'
import DashboardPage from '@Features/dashboard/pages/DashboardPage'
import ProductListPage from '@Features/products/pages/ProductListPage'
import MemberListPage from '@Features/members/pages/MemberListPage'
import OrderListPage from '@Features/orders/pages/OrderListPage'
import CategoryListPage from '@Features/categories/pages/CategoryListPage'
import RedirectIfAuthenticated from '@/Features/auth/RedirectIfAuthenticated'
import RequireAuth from '@/Features/auth/RequireAuth'
import LogoutPage from '@/Features/auth/pages/LogoutPage'
import MemberDetailPage from '@/Features/members/pages/MemberDeatailPage'
import OrderDetailPage from '@/Features/orders/pages/OrderDetailPage'
import ProductCreatePage from '@/Features/products/pages/ProductCreatePage'
import ProductDetailPage from '@/Features/products/pages/ProductDetailPage'
import ExhibitionListPage from '@/Features/exhibitions/pages/ExhibitionListPage'
import ExhibitionCreatePage from '@/Features/exhibitions/pages/ExhibitionCreatePage'

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
