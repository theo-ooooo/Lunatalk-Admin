import OrderListSection from '../components/orders/OrderListSection'
import MemberDetailSection from '../components/members/MemberDetailSection'

export default function MemberDetailPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <MemberDetailSection />
      <OrderListSection />
    </div>
  )
}
