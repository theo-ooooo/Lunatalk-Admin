import ProductCreateForm from '../components/ProductCreateForm'

export default function ProductCreatePage() {
  return (
    <div className="w-full mx-auto space-y-6 bg-white p-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">상품 등록</h2>
        <p className="text-sm text-muted-foreground">새로운 상품을 등록합니다.</p>
      </div>
      <ProductCreateForm />
    </div>
  )
}
