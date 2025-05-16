import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import type { Product } from '@/features/products/interface'

interface Props {
  products: Product[]
  selected: number[]
  onSelect: (id: number) => void
  onRemove: (id: number) => void
  onClear: () => void
  error?: string
}

export default function ProductSelector({ products, selected, onSelect, onRemove, onClear, error }: Props) {
  return (
    <div className="space-y-2">
      <Label>상품 선택</Label>
      <div className="flex gap-4 items-center">
        <Select onValueChange={(val) => onSelect(Number(val))}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="상품 선택" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.productId} value={String(product.productId)}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" variant="outline" onClick={onClear}>
          전체 초기화
        </Button>
      </div>
      <div className="space-y-1">
        {selected.map((id) => {
          const product = products.find((p) => p.productId === id)
          return (
            <div key={id} className="flex items-center justify-between border p-2 rounded-md">
              <span>{product?.name ?? `상품 ID: ${id}`}</span>
              <Button variant="ghost" type="button" onClick={() => onRemove(id)}>
                삭제
              </Button>
            </div>
          )
        })}
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}
