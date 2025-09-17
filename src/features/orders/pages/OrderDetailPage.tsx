import { useParams } from 'react-router'

import { useOrderDetail } from '../\bhooks/useOrderDetail'
import { Suspense } from 'react'
import OrderDetailSection from '../components/detail/OrderDetailSection'

export default function OrderDetailPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>()

  const { data } = useOrderDetail(orderNumber as string)

  return <Suspense fallback={<div>로딩중</div>}>{data ? <OrderDetailSection orderDetail={data} /> : <div>데이터가 존재 하지 않습니다.</div>}</Suspense>
}
