import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import type { OrderDetail, Delivery } from '../../interface'
import { Link } from 'react-router'
import { useOrderMutations } from '../../hooks/useOrderMutations'
import dayjs from 'dayjs'

interface Props {
  orderDetail: OrderDetail
}

// 한글 status를 영어로 변환하는 함수
const convertStatusToEnglish = (status: string): string => {
  const statusMap: Record<string, string> = {
    '주문완료': 'ORDERED',
    '결제 완료': 'ORDERED',
    '결제완료': 'ORDERED',
    '결제 실패': 'PAYMENT_FAILED',
    '결제실패': 'PAYMENT_FAILED',
    '결제 취소': 'CANCELLED',
    '결제취소': 'CANCELLED',
    '배송중': 'SHIPPED',
    '배송 완료': 'DELIVERED',
    '배송완료': 'DELIVERED',
  }
  return statusMap[status] || status
}

export default function OrderDetailSection({ orderDetail }: Props) {
  // 한글 status를 영어로 변환하여 state에 저장
  const initialEnglishStatus = useMemo(() => convertStatusToEnglish(orderDetail.status), [orderDetail.status])
  const [orderStatus, setOrderStatus] = useState(initialEnglishStatus)
  const [deliveries, setDeliveries] = useState(orderDetail.deliveries)

  // orderDetail이 업데이트될 때 orderStatus도 업데이트
  useEffect(() => {
    const englishStatus = convertStatusToEnglish(orderDetail.status)
    setOrderStatus(englishStatus)
  }, [orderDetail.status])

  const {
    orderMutaion: { mutate: orderMutate, isPending: isOrderPending },
    deliveryMutaion: { mutate: deliveryMutate, isPending: isDeliveryPending },
  } = useOrderMutations(orderDetail.orderNumber)

  const handleOrderStatusSave = () => {
    // API는 영어 status를 받으므로 그대로 전달
    orderMutate({ orderNumber: orderDetail.orderNumber, status: orderStatus })
  }

  const handleFieldChange = (deliveryId: number, field: keyof Delivery, value: string) => {
    setDeliveries((prev) => prev.map((d) => (d.deliveryId === deliveryId ? { ...d, [field]: value } : d)))
  }

  const handleDeliverySave = (deliveryId: number) => {
    const updated = deliveries.find((d) => d.deliveryId === deliveryId)
    if (updated) {
      deliveryMutate({ deliveryId: updated.deliveryId, trackingNumber: updated.trackingNumber, courierCompany: updated.courierCompany, status: updated.status })
    }
  }

  return (
    <div className="space-y-6">
      {/* 주문 정보 */}
      <Card>
        <div>
          <CardHeader>
            <CardTitle>주문 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>주문번호: {orderDetail.orderNumber}</p>
            <p>
              <Link to={`/members/${orderDetail.member.memberId}`}>회원: {orderDetail.member.nickname || orderDetail.member.username}</Link>
            </p>

            <div>
              <label className="block text-xs font-semibold mb-1">주문 상태</label>
              <Select disabled={isOrderPending} value={orderStatus} onValueChange={setOrderStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="주문 상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ORDERED">주문완료</SelectItem>
                  <SelectItem value="PAYMENT_FAILED">결제 실패</SelectItem>
                  <SelectItem value="CANCELLED">결제 취소</SelectItem>
                  <SelectItem value="SHIPPED">배송중</SelectItem>
                  <SelectItem value="DELIVERED">배송완료</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p>총 금액: {orderDetail.totalPrice.toLocaleString()}원</p>
            <p>주문일시: {dayjs(orderDetail.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
          </CardContent>
          <Button className="mt-2 mx-6" onClick={handleOrderStatusSave}>
            저장
          </Button>
        </div>
      </Card>

      {/* 주문 상품 */}
      <Card>
        <CardHeader>
          <CardTitle>주문 상품</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-2">상품명</th>
                <th className="text-left p-2">색상</th>
                <th className="text-right p-2">수량</th>
                <th className="text-right p-2">단가</th>
                <th className="text-right p-2">총 가격</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.orderItems.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{item.productName}</td>
                  <td className="p-2">{item.color}</td>
                  <td className="text-right p-2">{item.quantity}</td>
                  <td className="text-right p-2">{item.price.toLocaleString()}원</td>
                  <td className="text-right p-2">{item.totalPrice.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* 배송지 정보 */}
      {deliveries.map((delivery) => (
        <Card key={delivery.deliveryId}>
          <CardHeader>
            <CardTitle>배송지 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>수령인: {delivery.receiverName}</p>
            <p>연락처: {delivery.receiverPhone}</p>
            <p>
              주소: ({delivery.zipcode}) {delivery.addressLine1} {delivery.addressLine2}
            </p>
            <p>배송 메세지: {delivery.message ?? '-'}</p>

            <div className="space-y-2">
              <div>
                <label className="block text-xs font-semibold mb-1">택배사</label>
                <Select value={delivery.courierCompany || ''} onValueChange={(value) => handleFieldChange(delivery.deliveryId, 'courierCompany', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="택배사 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CJ_LOGISTICS">CJ대한통운</SelectItem>
                    <SelectItem value="HANJIN">한진택배</SelectItem>
                    <SelectItem value="LOTTE">롯데택배</SelectItem>
                    <SelectItem value="KOREA_POST">우체국택배</SelectItem>
                    <SelectItem value="LOGEN">로젠택배</SelectItem>
                    <SelectItem value="UPS">UPS</SelectItem>
                    <SelectItem value="DHL">DHL</SelectItem>
                    <SelectItem value="FEDEX">FedEx</SelectItem>
                    <SelectItem value="OTHER">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">운송장 번호</label>
                <Input disabled={isDeliveryPending} value={delivery.trackingNumber || ''} onChange={(e) => handleFieldChange(delivery.deliveryId, 'trackingNumber', e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">배송 상태</label>
                <Select disabled={isDeliveryPending} value={delivery.status} onValueChange={(value) => handleFieldChange(delivery.deliveryId, 'status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="배송 상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="READY">배송 준비중</SelectItem>
                    <SelectItem value="SHIPPED">배송중</SelectItem>
                    <SelectItem value="DELIVERED">배송 완료</SelectItem>
                    <SelectItem value="RETURNED">반품</SelectItem>
                    <SelectItem value="REDELIVERY">재배송</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="mt-2" onClick={() => handleDeliverySave(delivery.deliveryId)}>
                저장
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
